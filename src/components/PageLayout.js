// 모든 페이지 공통 틀: 상단 메뉴 + 본문 + 하단 고정 "비공식 컨셉" 고지
// 페이지마다 이 함수를 쓰면 고지 문구가 빠질 일이 없다
import { ConceptNotice } from './ConceptNotice.js';
import { SiteNav } from './SiteNav.js';

export function PageLayout(...sections) {
  const main = document.createElement('main');
  main.append(...sections);
  document.querySelector('#app').append(SiteNav(), main, ConceptNotice());
  return main;
}

// 로그인·회원가입처럼 상단 메뉴 없이 폼만 보여주는 페이지용 틀
// 메뉴만 빠지고, 비공식 고지 문구는 그대로 붙는다 (필수 규칙)
export function BareLayout(...sections) {
  const main = document.createElement('main');
  main.className = 'bare-main';
  main.append(...sections);
  document.querySelector('#app').append(main, ConceptNotice());
  return main;
}
