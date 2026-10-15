import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { PROMO_PRODUCT } from '../src/components/PromoBar.js';
import { HERO_PRODUCT } from '../src/components/Hero.js';

// src 아래 모든 .js 파일 모으기
function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    return statSync(full).isDirectory() ? walk(full) : full.endsWith('.js') ? [full] : [];
  });
}

// ⚠ 기본 조건: 브랜드 허락이 없으므로 공식몰(cecith.kr)로 가는 링크는 절대 금지
describe('공식몰 링크 금지', () => {
  const files = [...walk('src'), ...readdirSync('.').filter((f) => f.endsWith('.html'))];
  it.each(files)('%s에 공식몰 주소가 없다', (file) => {
    expect(readFileSync(file, 'utf8')).not.toMatch(/https?:\/\/(www\.)?cecith\.kr/);
  });
});

// 상단 안내 바와 히어로 버튼이 서로 다른 상품 위치로 연결되는지
describe('상품 버튼 연결 (사이트 안)', () => {
  it('상단 안내 바는 제품 페이지의 미니 세럼 30ml 위치로 연결된다', () => {
    expect(PROMO_PRODUCT.url).toBe('./products.html#mini');
    expect(PROMO_PRODUCT.name).toContain('30ml');
  });

  it('히어로 버튼은 제품 페이지의 일반 워터락 세럼 150ml 위치로 연결된다', () => {
    expect(HERO_PRODUCT.url).toBe('./products.html#serum');
    expect(HERO_PRODUCT.name).toContain('150ml');
  });

  it('두 버튼은 서로 다른 상품을 가리킨다', () => {
    expect(PROMO_PRODUCT.url).not.toBe(HERO_PRODUCT.url);
  });

  it('안내 바 가격은 확인된 소비자가·판매가와 같다 (2026-10-15 확인)', () => {
    expect(PROMO_PRODUCT.listPrice).toBe('15,000원');
    expect(PROMO_PRODUCT.salePrice).toBe('8,900원');
  });
});
