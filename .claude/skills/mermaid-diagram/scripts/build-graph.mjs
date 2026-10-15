// src/ 의 JS 파일들을 읽어 import 관계를 모으고,
// Mermaid flowchart(TD, 다크 테마) HTML로 저장하는 스크립트. 외부 패키지 설치 없이 Node만으로 동작한다.
// 사용법: node .claude/skills/mermaid-diagram/scripts/build-graph.mjs [소스폴더] [출력파일]
import { readFileSync, writeFileSync, readdirSync, statSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname, relative, resolve, basename, posix } from 'node:path';

const ROOT = process.cwd();
const SRC = resolve(ROOT, process.argv[2] ?? 'src');
const OUT = resolve(ROOT, process.argv[3] ?? 'docs/architecture/index.html');
const CODE_EXT = /\.(m?js|jsx|ts|tsx)$/;
const TRY_EXT = ['', '.js', '.mjs', '.ts', '.jsx', '.tsx', '/index.js', '/index.ts'];

// 1) src 아래 코드 파일을 모두 모은다
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return CODE_EXT.test(name) ? [full] : [];
  });
}

// 2) 파일 종류 분류: 폴더 이름과 파일 이름 규칙으로 판단
function kindOf(rel) {
  const name = basename(rel);
  if (/(^|\/)hooks\//.test(rel) || /^use[A-Z]/.test(name)) return 'hook';
  if (/(^|\/)components\//.test(rel)) return 'component';
  if (/(^|\/)(lib|utils?|helpers?)\//.test(rel)) return 'util';
  return 'entry'; // main.js, *Page.js 처럼 페이지 시작점
}

// 3) import 문에서 경로만 뽑는다 (정적 import, export from, 동적 import())
const IMPORT_PATTERNS = [
  /(?:import|export)\s[^'"`;]*?from\s*['"]([^'"]+)['"]/g,
  /import\s*['"]([^'"]+)['"]/g,
  /import\(\s*['"]([^'"]+)['"]\s*\)/g,
];

function importsOf(code) {
  const code2 = code.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, ''); // 주석 제거
  return IMPORT_PATTERNS.flatMap((re) => [...code2.matchAll(re)].map((m) => m[1]));
}

// 상대 경로 import를 실제 파일 경로로 바꾼다 (확장자 생략 대응)
function resolveLocal(fromFile, spec) {
  const base = resolve(dirname(fromFile), spec);
  return TRY_EXT.map((ext) => base + ext).find((p) => existsSync(p) && statSync(p).isFile());
}

const files = walk(SRC);
const toRel = (p) => relative(SRC, p).split('\\').join(posix.sep);
const nodes = new Map(); // rel 경로 → { id, label, kind }
const edges = new Set(); // "from-->to"
const externals = new Set();

const idOf = (key) => 'n_' + key.replace(/[^A-Za-z0-9]/g, '_');

files.forEach((file) => {
  const rel = toRel(file);
  nodes.set(rel, { id: idOf(rel), label: rel, kind: kindOf(rel) });
});

files.forEach((file) => {
  const from = toRel(file);
  importsOf(readFileSync(file, 'utf8')).forEach((spec) => {
    if (spec.startsWith('.')) {
      const target = resolveLocal(file, spec);
      // CSS·이미지 등 코드가 아닌 파일은 그래프에서 뺀다
      if (!target || !CODE_EXT.test(target)) return;
      const to = toRel(target);
      if (nodes.has(to)) edges.add(`${nodes.get(from).id}-->${nodes.get(to).id}`);
    } else if (!spec.startsWith('/') && !/^https?:/.test(spec)) {
      // 외부 패키지: @scope/name 또는 name 까지만 표시
      const pkg = spec.startsWith('@') ? spec.split('/').slice(0, 2).join('/') : spec.split('/')[0];
      if (pkg.startsWith('node:')) return;
      externals.add(pkg);
      edges.add(`${nodes.get(from).id}-->${idOf('pkg_' + pkg)}`);
    }
  });
});

// 4) Mermaid 문법 만들기: 종류별 subgraph + 색상 class
const GROUPS = [
  ['entry', '페이지 시작점'],
  ['component', '컴포넌트'],
  ['hook', '훅'],
  ['util', '유틸 · lib'],
];
const esc = (s) => s.replace(/"/g, '#quot;');
const lines = ['flowchart TD'];

GROUPS.forEach(([kind, title]) => {
  const members = [...nodes.values()].filter((n) => n.kind === kind);
  if (!members.length) return;
  lines.push(`  subgraph g_${kind}["${title}"]`);
  members.forEach((n) => lines.push(`    ${n.id}["${esc(n.label)}"]:::${kind}`));
  lines.push('  end');
});
if (externals.size) {
  lines.push('  subgraph g_pkg["외부 패키지"]');
  externals.forEach((p) => lines.push(`    ${idOf('pkg_' + p)}[["${esc(p)}"]]:::pkg`));
  lines.push('  end');
}
edges.forEach((e) => lines.push(`  ${e}`));
lines.push(
  '  classDef entry fill:#3b2f24,stroke:#c9a27e,color:#f6e4d1',
  '  classDef component fill:#1f2a36,stroke:#7fa7c9,color:#e6eef5',
  '  classDef hook fill:#2a2236,stroke:#a98fd1,color:#efe9f7',
  '  classDef util fill:#1f3029,stroke:#82b89b,color:#e5f2eb',
  '  classDef pkg fill:#2b2b2b,stroke:#888,color:#ddd,stroke-dasharray:4 3',
);
const diagram = lines.join('\n');

// 5) HTML로 저장 (Mermaid는 CDN에서 불러옴 → 인터넷 연결 필요)
const counts = GROUPS.map(([k, t]) => `${t} ${[...nodes.values()].filter((n) => n.kind === k).length}`).join(' · ');
const html = `<!doctype html>
<html lang="ko">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="robots" content="noindex" />
<title>의존성 그래프 | ${esc(basename(ROOT))}</title>
<style>
  body { margin: 0; padding: 24px 16px; background: #111; color: #ddd; font-family: Pretendard, system-ui, sans-serif; }
  h1 { margin: 0 0 4px; font-size: 22px; font-weight: 500; }
  p { margin: 0 0 24px; color: #999; font-size: 14px; }
  .graph { overflow-x: auto; }
  details { margin-top: 32px; font-size: 13px; }
  pre { white-space: pre-wrap; color: #aaa; }
</style>
</head>
<body>
<h1>src 의존성 그래프</h1>
<p>${counts} · 외부 패키지 ${externals.size} · 연결 ${edges.size} — 생성: ${new Date().toISOString().slice(0, 10)}</p>
<div class="graph"><pre class="mermaid">
${diagram}
</pre></div>
<details><summary>Mermaid 원본 보기</summary><pre>${diagram.replace(/</g, '&lt;')}</pre></details>
<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
  mermaid.initialize({ startOnLoad: true, theme: 'dark', flowchart: { curve: 'basis' } });
</script>
</body>
</html>
`;

mkdirSync(dirname(OUT), { recursive: true });
writeFileSync(OUT, html);
console.log(`파일 ${nodes.size}개, 외부 패키지 ${externals.size}개, 연결 ${edges.size}개 → ${relative(ROOT, OUT)}`);
