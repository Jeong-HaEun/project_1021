// 메인 본문 섹션들이 같이 쓰는 작은 조각
import { el } from '../lib/dom.js';

// 섹션 제목: 작은 영문 라벨(보조) + 한국어 제목(주) — 히어로와 같은 위계
export function SectionHeader({ id, label, title, desc }) {
  return el('header', { className: 'section__head' }, [
    el('p', { className: 'section__label', lang: 'en', text: label }),
    el('h2', { id, className: 'section__title', text: title }),
    desc && el('p', { className: 'section__desc', text: desc }),
  ]);
}

// 섹션 틀: aria-labelledby로 제목과 연결 → 화면낭독기에서 섹션 이름으로 이동 가능
export function Section({ id, className, header, children }) {
  return el('section', { className: `section ${className}`, 'aria-labelledby': id }, [
    SectionHeader({ id, ...header }),
    ...children,
  ]);
}

// 우리 사이트 안의 페이지로 가는 링크·버튼 (같은 탭)
// ⚠ 공식몰(cecith.kr)로 가는 링크는 만들지 않는다 (브랜드 허락 없음)
export function PageLink({ href, text, className = 'text-link' }) {
  return el('a', { className, href, text });
}

// 사이트 밖(예: 유튜브)으로 나가는 링크 — 새 탭 + ↗ 표시 + 화면낭독기용 "새 창" 안내
// 공식몰 주소는 여기에도 넣지 않는다
export function ExternalLink({ href, text, className = 'text-link' }) {
  return el('a', {
    className,
    href,
    target: '_blank',
    rel: 'noopener noreferrer',
    'aria-label': `${text} (새 창)`,
  }, [el('span', { text }), el('span', { 'aria-hidden': 'true', text: ' ↗' })]);
}

// public/images의 이미지 (지금은 회색 자리표시, IMAGES.md 참고)
export function SiteImage({ file, alt, width, height }) {
  return el('img', {
    src: `${import.meta.env.BASE_URL}images/${file}`,
    alt,
    width: String(width),
    height: String(height),
    loading: 'lazy', // 첫 화면 아래 이미지는 스크롤할 때 불러온다
  });
}
