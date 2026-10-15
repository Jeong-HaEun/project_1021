// 메인 히어로 — 가로 전체를 채우는 사진 위, 왼쪽 여백에 한국어 메시지를 올린다 (원본 메인 구성 참고)
//
// 문구 근거: 원본 메인 메타 설명 "약사가 설계한 피부장벽 루틴 솔루션" (2026-10-15 확인)
// 영문 슬로건 "Own Your Natural Glow"는 원본 슬로건 → 작고 연한 보조 요소로만 둔다
// 버튼은 할인 혜택이 없는 일반 워터락 세럼(150ml) 상세로 연결 → "혜택"을 약속하지 않는 문구 사용
// (상단 안내 바의 30ml 미니 세럼과 헷갈리지 않도록 용량을 함께 표기)
import { el } from '../lib/dom.js';

export const HERO_PRODUCT = {
  url: 'https://cecith.kr/product/detail.html?product_no=11',
  name: '워터락 퍼스트 세럼 150ml',
};

// 사진 밝기에 따라 글자색을 고른다: 'dark' = 밝은 사진 위 진한 글자, 'light' = 어두운 사진 위 흰 글자
// 지금은 밝은 회색 자리표시라 'dark'. 실제 사진을 넣으면 사진에 맞게 바꾼다 (IMAGES.md 참고)
const HERO_TONE = 'dark';

// 이미지는 아직 회색 자리표시 (IMAGES.md). 같은 파일명으로 덮어쓰면 바뀐다
function HeroImage() {
  const base = import.meta.env.BASE_URL; // GitHub Pages 하위 주소 대응
  return el('picture', { className: 'hero__media' }, [
    // 좁은 화면에서는 세로형(4:5) 이미지
    el('source', { media: '(max-width: 899px)', srcset: `${base}images/hero-main-mobile.png`, width: '1080', height: '1350' }),
    el('img', {
      src: `${base}images/hero-main.png`,
      alt: '수분감 있는 세럼 텍스처 클로즈업',
      width: '1920',
      height: '1080',
      fetchpriority: 'high', // 첫 화면 이미지라 먼저 불러온다
    }),
  ]);
}

export function Hero() {
  return el('section', { className: 'hero', 'data-tone': HERO_TONE, 'aria-labelledby': 'hero-title' }, [
    HeroImage(),
    el('div', { className: 'hero__text' }, [
      el('p', { className: 'hero__slogan', lang: 'en', text: 'Own Your Natural Glow' }),
      // 두 줄 고정: 화면 너비와 상관없이 "약사가 설계한 / 매일의 피부장벽 루틴"으로 끊는다
      el('h1', { id: 'hero-title', className: 'hero__title' }, [
        el('span', { text: '약사가 설계한' }),
        el('span', { text: '매일의 피부장벽 루틴' }),
      ]),
      el('p', {
        className: 'hero__desc',
        text: '피부장벽을 중심으로, 매일의 스킨케어에 필요한 제품과 사용법을 살펴보세요.',
      }),
      el('a', {
        className: 'hero__cta',
        href: HERO_PRODUCT.url,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `워터락 세럼 자세히 보기: ${HERO_PRODUCT.name}, 공식몰 상품 페이지 새 창으로 열기`,
      }, [
        el('span', { text: '워터락 세럼 자세히 보기' }),
        el('span', { 'aria-hidden': 'true', text: '↗' }),
      ]),
      el('p', { className: 'hero__cta-note', text: `${HERO_PRODUCT.name} · 공식몰` }),
    ]),
  ]);
}
