---
name: mermaid-diagram
description: src/ 의 컴포넌트·훅·유틸 파일을 import 관계로 분석해 의존성 그래프를 만들고, docs/architecture/index.html 에 Mermaid flowchart TD(다크 테마)로 그려 브라우저로 연다. "의존성 그래프", "구조도", "아키텍처 다이어그램", "mermaid로 그려줘" 같은 요청에 사용.
---

# Mermaid 의존성 그래프

src/ 안의 코드 파일이 서로 무엇을 import 하는지 한 장의 그림으로 보여준다.
발표 때 "이 화면이 어떤 부품과 기능으로 이루어졌는지" 설명하는 용도.

## 순서

1. **그래프 만들기** — 프로젝트 루트에서 스크립트를 실행한다.

   ```
   node .claude/skills/mermaid-diagram/scripts/build-graph.mjs
   ```

   - 기본값: 입력 `src`, 출력 `docs/architecture/index.html`
   - 다른 폴더나 파일이 필요하면 인자로 넘긴다: `node <스크립트> <소스폴더> <출력파일>`
   - 스크립트가 하는 일
     - src 아래 `.js/.mjs/.ts/.jsx/.tsx` 파일 수집
     - 파일 분류: `components/` → 컴포넌트, `hooks/` 또는 `useXxx` → 훅, `lib/`·`utils/` → 유틸, 그 외(main.js, *Page.js) → 페이지 시작점
     - `import ... from`, `export ... from`, `import 'x'`, `import('x')` 경로를 읽어 연결선 생성
     - 상대 경로는 실제 파일로 풀고(확장자 생략 대응), CSS·이미지는 제외
     - 외부 패키지(`@supabase/supabase-js` 등)는 점선 노드로 따로 표시, `node:` 내장 모듈은 제외
     - 종류별 subgraph + 색상, `flowchart TD`, Mermaid `theme: 'dark'`

2. **결과 확인** — 출력된 개수(파일·패키지·연결)를 사용자에게 알린다.
   연결 0개이거나 파일 수가 이상하면 src 경로·import 문법을 먼저 확인한다.

3. **브라우저로 열기**
   - Windows: `start "" docs/architecture/index.html` (PowerShell: `Start-Process docs/architecture/index.html`)
   - macOS: `open docs/architecture/index.html` / Linux: `xdg-open docs/architecture/index.html`
   - Claude in Chrome 도구를 쓸 수 있으면 열어서 그림이 그려졌는지 스크린샷으로 확인해도 된다.
     (Mermaid를 CDN에서 불러오므로 인터넷 연결이 필요하다)

## 주의

- 스크립트는 파일을 읽기만 하고, 출력 파일 하나만 쓴다. src 코드는 수정하지 않는다.
- 생성된 HTML에도 `<meta name="robots" content="noindex">` 를 넣는다(프로젝트 규칙).
- 결과물을 저장소에 커밋할지는 사용자에게 묻는다. 코드가 바뀌면 다시 실행해 갱신한다.
- 이 스킬로 코드를 만들거나 바꾸면 CHANGELOG.md 에 한 줄 기록한다.
