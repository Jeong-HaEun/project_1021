import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';

// 프로젝트 맨 위의 모든 HTML 페이지가 반드시 지킬 규칙을 확인한다
const pages = readdirSync('.').filter((name) => name.endsWith('.html'));

describe('모든 페이지 공통 규칙', () => {
  it.each(pages)('%s: noindex 태그가 있다', (page) => {
    expect(readFileSync(page, 'utf8')).toContain('<meta name="robots" content="noindex" />');
  });

  // 고지 문구는 PageLayout·BareLayout이 붙이므로, 각 페이지 스크립트가 둘 중 하나를 쓰는지 확인
  it.each(pages)('%s: 공통 틀(PageLayout/BareLayout)을 사용한다', (page) => {
    const html = readFileSync(page, 'utf8');
    const script = html.match(/src="\/(src\/[^"]+\.js)"/)[1];
    expect(readFileSync(script, 'utf8')).toMatch(/(PageLayout|BareLayout)\(/);
  });

  it.each(pages)('%s: 빈 링크(#)가 없다', (page) => {
    expect(readFileSync(page, 'utf8')).not.toMatch(/href="#"/);
  });
});

describe('회원가입 화면 안내', () => {
  it('데모 경고 문구가 CLAUDE.md와 같다', () => {
    const source = readFileSync('src/components/SignupForm.js', 'utf8');
    expect(source).toContain('실습용 데모 페이지입니다. 실제 개인정보를 입력하지 마세요');
  });
});
