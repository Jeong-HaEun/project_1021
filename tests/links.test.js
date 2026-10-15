import { describe, it, expect } from 'vitest';
import { PROMO_PRODUCT } from '../src/components/PromoBar.js';
import { HERO_PRODUCT } from '../src/components/Hero.js';

// 상단 안내 바와 히어로 버튼이 서로 다른 상품으로 정확히 연결되는지
// (미니 세럼과 일반 세럼을 헷갈려 연결하는 실수를 막는다)
describe('공식몰 상품 연결', () => {
  it('상단 안내 바는 미니 세럼 30ml(product_no=20)로 연결된다', () => {
    expect(PROMO_PRODUCT.url).toBe('https://cecith.kr/product/detail.html?product_no=20');
    expect(PROMO_PRODUCT.name).toContain('30ml');
  });

  it('히어로 버튼은 일반 워터락 세럼 150ml(product_no=11)로 연결된다', () => {
    expect(HERO_PRODUCT.url).toBe('https://cecith.kr/product/detail.html?product_no=11');
    expect(HERO_PRODUCT.name).toContain('150ml');
  });

  it('두 링크는 서로 다른 상품이다', () => {
    expect(PROMO_PRODUCT.url).not.toBe(HERO_PRODUCT.url);
  });

  it('안내 바 가격은 공식몰 소비자가·판매가와 같다 (2026-10-15 확인)', () => {
    expect(PROMO_PRODUCT.listPrice).toBe('15,000원');
    expect(PROMO_PRODUCT.salePrice).toBe('8,900원');
  });
});
