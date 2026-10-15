// 최상단 혜택 안내 바 — 구체적인 상품·용량·가격을 보여주고 공식몰 상세로 연결
// 이 사이트에는 상품 상세·구매 기능이 없으므로 공식몰을 새 탭으로 연다 (CLAUDE.md: "공식몰에서 보기")
//
// 표시 정보 근거: 공식몰 상품 페이지(product_no=20) 2026-10-15 확인
// - 상품명 "[WELCOME] 워터락 퍼스트 세럼 30ml", 소비자가 15,000원, 판매가 8,900원
// - 배송비 3,000원(5만원 이상 무료) → 8,900원이 최종 결제금액처럼 보이지 않게 "배송비 별도" 표기
// - 신규가입·첫구매 한정, 수량 제한, 쿠폰 조건은 상세 화면에 안내 문구가 없어 표시하지 않음
import { el } from '../lib/dom.js';

export const PROMO_PRODUCT = {
  url: 'https://cecith.kr/product/detail.html?product_no=20',
  name: '워터락 퍼스트 세럼 30ml',
  listPrice: '15,000원', // 소비자가
  salePrice: '8,900원', // 판매가 (상품가격, 배송비 미포함)
};

export function PromoBar() {
  const { url, name, listPrice, salePrice } = PROMO_PRODUCT;
  return el('div', { className: 'promo-bar' }, el('a', {
    href: url,
    target: '_blank',
    rel: 'noopener noreferrer', // 새 탭이 이 페이지를 조작하지 못하게
    // 화면낭독기용: 취소선은 읽히지 않으므로 가격 의미를 말로 풀어 준다
    'aria-label': `${name}, 소비자가 ${listPrice}, 판매가 ${salePrice}, 배송비 별도. 공식몰 상품 페이지 새 창으로 열기`,
  }, [
    el('span', { className: 'promo-bar__name', text: name }),
    el('span', { className: 'promo-bar__price' }, [
      el('del', { text: listPrice }),
      el('span', { 'aria-hidden': 'true', text: ' → ' }),
      el('strong', { text: salePrice }),
    ]),
    el('span', { className: 'promo-bar__meta', text: '배송비 별도 · 공식몰 ↗' }),
  ]));
}
