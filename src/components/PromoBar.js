// 최상단 혜택 안내 바 — 구체적인 상품·용량·가격을 보여주고 우리 제품 페이지의 미니 세럼 위치로 연결
// ⚠ 공식몰(cecith.kr)로는 연결하지 않는다 (브랜드 허락 없음) — 같은 사이트 안에서 이동
//
// 표시 정보 근거: 공식몰 상품 정보(미니 세럼) 2026-10-15 확인 — 링크 없이 내용만 참고
// - 상품명 "워터락 퍼스트 세럼 30ml", 소비자가 15,000원, 판매가 8,900원
// - 배송비 3,000원(5만원 이상 무료) → 8,900원이 최종 결제금액처럼 보이지 않게 "배송비 별도" 표기
// - 신규가입·첫구매 한정, 수량 제한, 쿠폰 조건은 확인되지 않아 표시하지 않음
import { el } from '../lib/dom.js';

export const PROMO_PRODUCT = {
  url: './products.html#mini',
  name: '워터락 퍼스트 세럼 30ml',
  listPrice: '15,000원', // 소비자가
  salePrice: '8,900원', // 판매가 (상품가격, 배송비 미포함)
};

export function PromoBar() {
  const { url, name, listPrice, salePrice } = PROMO_PRODUCT;
  return el('div', { className: 'promo-bar' }, el('a', {
    href: url,
    // 화면낭독기용: 취소선은 읽히지 않으므로 가격 의미를 말로 풀어 준다
    'aria-label': `${name}, 소비자가 ${listPrice}, 판매가 ${salePrice}, 배송비 별도. 제품 페이지에서 자세히 보기`,
  }, [
    el('span', { className: 'promo-bar__name', text: name }),
    el('span', { className: 'promo-bar__price' }, [
      el('del', { text: listPrice }),
      el('span', { 'aria-hidden': 'true', text: ' → ' }),
      el('strong', { text: salePrice }),
    ]),
    el('span', { className: 'promo-bar__meta', text: '배송비 별도' }),
  ]));
}
