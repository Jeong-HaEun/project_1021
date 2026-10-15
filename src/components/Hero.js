// 메인 히어로 — 첫 방문자가 "어떤 분야의 어떤 브랜드인지"를 한국어로 바로 이해하게 한다
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

// 이미지는 아직 회색 자리표시 (IMAGES.md). 같은 파일명으로 덮어쓰면 바뀐다
function HeroImage() {
  const base = import.meta.env.BASE_URL; // GitHub Pages 하위 주소 대응
  const img = el('img', {
    src: `${base}images/hero-main.png`,
    alt: '수분감 있는 세럼 텍스처 클로즈업',
    width: '1920',
    height: '1080',
    fetchpriority: 'high', // 첫 화면 이미지라 먼저 불러온다
  });
  return el('picture', { className: 'hero__media' }, [
    // 좁은 화면에서는 세로형(4:5) 이미지
    el('source', { media: '(max-width: 899px)', srcset: `${base}images/hero-main-mobile.png`, width: '1080', height: '1350' }),
    img,
  ]);
}

export function Hero() {
  return el('section', { className: 'hero', 'aria-labelledby': 'hero-title' }, [
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
        className: 'btn-primary btn-link hero__cta',
        href: HERO_PRODUCT.url,
        target: '_blank',
        rel: 'noopener noreferrer',
        'aria-label': `워터락 세럼 자세히 보기: ${HERO_PRODUCT.name}, 공식몰 상품 페이지 새 창으로 열기`,
      }, [
        el('span', { text: '워터락 세럼 자세히 보기' }),
        el('span', { 'aria-hidden': 'true', text: '↗' }),
      ]),
      el('p', { className: 'hero__cta-note', text: `${HERO_PRODUCT.name} · 공식몰로 이동합니다` }),
    ]),
    HeroImage(),
  ]);
}
