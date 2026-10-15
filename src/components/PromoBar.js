// 최상단 띠 — 첫 구매 상품(미니 세럼)으로 클릭을 유도한다
// 이 사이트는 구매 기능이 없으므로 공식몰 상품 페이지를 새 탭으로 연다 (CLAUDE.md: "공식몰에서 보기")
// 상품명·용량·가격은 공식몰 상품 페이지(product_no=20) 표기 그대로, 2026-10-15 확인
import { el } from '../lib/dom.js';

export const PROMO_URL = 'https://cecith.kr/product/detail.html?product_no=20';

export function PromoBar() {
  return el('div', { className: 'promo-bar' }, el('a', {
    href: PROMO_URL,
    target: '_blank',
    rel: 'noopener noreferrer', // 새 탭이 이 페이지를 조작하지 못하게
    'aria-label': '처음 만나는 세시드, 미니 세럼 30ml 8,900원. 공식몰에서 보기 (새 창)',
  }, [
    el('span', { text: '처음 만나는 세시드, 미니 세럼 30ml 8,900원' }),
    el('span', { className: 'promo-bar__arrow', 'aria-hidden': 'true', text: '→' }),
  ]));
}
