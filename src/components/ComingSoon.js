// "준비 중" 페이지 — 메뉴 링크가 404(빈 링크)가 되지 않도록 먼저 만들어 둔 자리
// 페이지 제목·설명은 각 HTML의 <body data-title / data-desc>에서 읽는다
import { el } from '../lib/dom.js';

export function ComingSoon() {
  const { title = '페이지', desc = '' } = document.body.dataset;
  return el('section', { className: 'coming-soon' }, [
    el('h1', { className: 'coming-soon__title', text: title }),
    desc && el('p', { className: 'coming-soon__desc', text: desc }),
    el('p', { className: 'coming-soon__status', text: '준비 중입니다. 곧 채워질 예정이에요.' }),
    el('a', { className: 'btn-primary btn-link', href: './index.html', text: '메인으로' }),
  ]);
}
