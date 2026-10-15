import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import * as content from '../src/lib/mainContent.js';

const { PRODUCTS, MINI, REVIEWS, REVIEW_SOURCE, REVIEW_STATS, FAQS, ROUTINES, BRAND, GUIDE_POST } = content;

// 메인 섹션이 정한 순서대로 붙는지 (화면 순서 = 문서 순서)
describe('메인 섹션 순서', () => {
  it('히어로 → 제품 → 후기 → 근거 → 루틴 → FAQ → 브랜드', () => {
    const main = readFileSync('src/main.js', 'utf8');
    const order = ['Hero()', 'ProductCompare()', 'ReviewSummary()', 'ProductReasons()', 'DailyRoutine()', 'GuideFaq()', 'BrandStory()'];
    const positions = order.map((name) => main.lastIndexOf(name));
    expect(positions.every((p) => p > 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });
});

// 후기는 실제 데이터 기준만 (가상 후기·별점 생성 금지)
describe('사용 후기 데이터', () => {
  it.each(REVIEWS)('$author: 제품명·가린 작성자·작성 시점·구매 인증이 있다', (review) => {
    expect(review.product).toMatch(/워터락|워터핏/);
    expect(review.author).toContain('*');
    expect(review.written).toMatch(/작성/);
    expect(review.verified).toBe(true);
  });

  it('발췌 여부는 위치(start·middle) 또는 전문(null)으로만 표시한다', () => {
    REVIEWS.forEach((r) => expect(['start', 'middle', null]).toContain(r.excerpt));
  });

  it('후기별 별점은 만들지 않는다 (상품 평균만 출처와 함께)', () => {
    REVIEWS.forEach((r) => expect(r).not.toHaveProperty('rating'));
    expect(REVIEW_STATS.length).toBeGreaterThan(0);
  });

  it('출처·확인일·전체 후기 경로가 있다', () => {
    expect(REVIEW_SOURCE.checkedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(REVIEW_SOURCE.allUrl).toBe('./products.html#reviews');
  });
});

describe('제품 비교', () => {
  it('같은 상품 카드를 반복하지 않는다', () => {
    const ids = PRODUCTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    const urls = [...PRODUCTS.map((p) => p.url), MINI.url];
    expect(new Set(urls).size).toBe(urls.length);
  });

  it('미니 세럼은 용량과 배송비 별도를 안내한다', () => {
    expect(MINI.volume).toBe('30ml');
    expect(MINI.notes.join(' ')).toContain('배송비는 별도');
  });

  it('루틴에 쓰인 제품은 모두 제품 목록에 있다', () => {
    const ids = PRODUCTS.map((p) => p.id);
    ROUTINES.flatMap((r) => r.steps).forEach((s) => expect(ids).toContain(s.productId));
  });
});

describe('FAQ', () => {
  it('배송비 질문은 공식몰 기준 금액을 안내한다', () => {
    const shipping = FAQS.find((f) => f.q.includes('배송비'));
    expect(shipping.a).toContain('3,000원');
    expect(shipping.a).toContain('50,000원');
  });
});

// CLAUDE.md 표현 규칙: 의학적 표현·근거 없는 최상급 금지
describe('표현 규칙', () => {
  const allText = JSON.stringify({ PRODUCTS, MINI, REVIEWS, FAQS, ROUTINES, BRAND, GUIDE_POST, REASONS: content.REASONS });
  it.each(['치료', '재생', '완치', '염증', '아토피', '1위', '최고'])('"%s" 표현이 없다', (word) => {
    expect(allText).not.toContain(word);
  });

  // 공식몰 링크 금지 — 사이트 밖으로 나가는 링크는 유튜브 채널뿐
  it('사이트 밖 링크는 유튜브 채널뿐이고, 공식몰 링크는 없다', () => {
    const urls = allText.match(/https?:\/\/[^"]+/g) || [];
    urls.forEach((u) => expect(u).toMatch(/^https:\/\/www\.youtube\.com\/@ceci_yaksa/));
  });
});
