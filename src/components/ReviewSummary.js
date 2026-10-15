// ③ 사용 후기 요약 — 대표 제품 바로 다음. 공식몰에 실제로 올라온 후기만 짧게 보여준다
// 표시 기준: 제품명 · 작성자(가림 처리 그대로) · 작성 시점 · 구매 인증 · 출처 · 확인일
// 후기별 별점은 확인되지 않아 표시하지 않고, 상품 평균 별점·후기 수만 출처와 함께 표시
// 큰 슬라이더 대신 작은 카드 목록 (모바일은 한 줄씩)
import { el } from '../lib/dom.js';
import { REVIEWS, REVIEW_SOURCE, REVIEW_STATS } from '../lib/mainContent.js';
import { PageLink, Section } from './SectionParts.js';

// 발췌 위치에 맞춰 생략 부호를 붙인다: 첫 부분 발췌 → 뒤에 …, 가운데 발췌 → 앞뒤에 …
function withEllipsis({ text, excerpt }) {
  if (excerpt === 'start') return `${text} …`;
  if (excerpt === 'middle') return `… ${text} …`;
  return text;
}

function ReviewCard(review) {
  return el('li', { className: 'review-card' }, [
    el('p', { className: 'review-card__product', text: review.product }),
    el('blockquote', { className: 'review-card__text' }, [
      el('p', { text: withEllipsis(review) }),
    ]),
    el('p', { className: 'review-card__meta' }, [
      `${review.author} · ${review.written}`,
      review.verified && el('span', { className: 'review-card__badge', text: '구매 인증' }),
    ]),
  ]);
}

export function ReviewSummary() {
  const { name, checkedAt, allUrl } = REVIEW_SOURCE;
  return Section({
    id: 'reviews-title',
    className: 'reviews',
    header: { label: 'Real Review', title: '사용 후기', desc: '공식몰에 남겨진 실제 후기 중 사용감을 이야기한 글을 골랐어요.' },
    children: [
      el('ul', { className: 'review-stats', 'aria-label': '상품별 평균 별점과 후기 수' },
        REVIEW_STATS.map((s) => el('li', {}, [
          el('span', { text: s.product }),
          el('strong', { text: ` ★ ${s.rating}` }),
          el('span', { text: ` · 후기 ${s.count}개` }),
        ]))),
      el('ul', { className: 'review-list' }, REVIEWS.map(ReviewCard)),
      el('p', { className: 'section__source' }, [
        `출처: ${name} · ${checkedAt} 확인. 작성 시점은 확인일 기준이며 "…"은 생략한 부분이에요. `,
        PageLink({ href: allUrl, text: '전체 후기 보기' }),
      ]),
    ],
  });
}
