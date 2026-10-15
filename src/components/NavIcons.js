// 상단 메뉴 오른쪽의 얇은 선 아이콘 (원본 헤더처럼 사람·가방 모양)
// 원본 아이콘 파일을 가져오지 않고 직접 그린 SVG — 색은 글자색(currentColor)을 따라간다
// innerHTML 대신 createElementNS로 만든다 → 문자열이 HTML로 실행될 일이 없다
const SVG_NS = 'http://www.w3.org/2000/svg';

function lineIcon(shapes) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', 'currentColor');
  svg.setAttribute('stroke-width', '1.3');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('aria-hidden', 'true'); // 이름은 감싼 링크·버튼의 aria-label이 알려준다
  shapes.forEach(([tag, attrs]) => {
    const shape = document.createElementNS(SVG_NS, tag);
    Object.entries(attrs).forEach(([key, value]) => shape.setAttribute(key, value));
    svg.append(shape);
  });
  return svg;
}

// 사람: 동그란 머리 + 어깨 곡선
export function PersonIcon() {
  return lineIcon([
    ['circle', { cx: '12', cy: '8', r: '4' }],
    ['path', { d: 'M4.5 20.5c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5' }],
  ]);
}

// 장바구니: 손잡이 달린 쇼핑백
export function BagIcon() {
  return lineIcon([
    ['path', { d: 'M5 8.5h14l-1 12H6z' }],
    ['path', { d: 'M9 8.5V7a3 3 0 0 1 6 0v1.5' }],
  ]);
}
