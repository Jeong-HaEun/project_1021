// ④ 제품을 선택할 근거 — 상품 페이지에서 확인된 성분·제형·특징만 정리
// "약사가 만들었으니 효과가 있다"처럼 이력을 효과의 보증으로 쓰지 않는다 (CLAUDE.md 표현 규칙)
import { el } from '../lib/dom.js';
import { REASONS } from '../lib/mainContent.js';
import { Section } from './SectionParts.js';

function ReasonCard({ title, points }) {
  return el('li', { className: 'reason-card' }, [
    el('h3', { className: 'reason-card__title', text: title }),
    el('dl', { className: 'reason-card__list' },
      points.flatMap(([term, detail]) => [el('dt', { text: term }), el('dd', { text: detail })])),
  ]);
}

export function ProductReasons() {
  return Section({
    id: 'reasons-title',
    className: 'reasons',
    header: { label: 'Why Cecith', title: '성분과 특징', desc: '공식 상품 정보에 적힌 성분과 특징만 모았어요.' },
    children: [el('ul', { className: 'reason-grid' }, REASONS.map(ReasonCard))],
  });
}
