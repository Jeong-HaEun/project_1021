// 로그인 화면 상단의 환영 문구 + 신규 회원 혜택 3가지
// 원본 사이트는 혜택 배너가 길어 입력칸까지 스크롤이 필요했다
// → 한 줄짜리 3칸으로 압축해, 모바일에서도 입력칸이 첫 화면에 보이게 한다
import { el } from '../lib/dom.js';

// 혜택 문구는 원본 사이트에 안내된 내용 그대로 (금액·조건을 새로 만들지 않는다)
const BENEFITS = [
  { label: '신규 가입 쿠폰팩', value: '4만원' },
  { label: '첫 주문', value: '무료배송' },
  { label: '생일 기념 쿠폰', value: '7천원' },
];

export function WelcomeBenefits() {
  return el('div', { className: 'welcome' }, [
    el('h1', { id: 'login-title', className: 'welcome__title', text: '세시드 친구들 환영합니다' }),
    el('ul', { className: 'welcome__list', 'aria-label': '신규 회원 혜택' },
      BENEFITS.map(({ label, value }) => el('li', { className: 'welcome__item' }, [
        el('span', { className: 'welcome__label', text: label }),
        el('strong', { className: 'welcome__value', text: value }),
      ]))),
    // 쿠폰 지급 기능은 없다 → 실제 혜택으로 오해하지 않도록 안내 (CLAUDE.md 쿠폰 기능 금지)
    el('p', { className: 'welcome__note', text: '혜택은 공식몰 기준이며, 이 컨셉 사이트에서는 제공되지 않습니다.' }),
  ]);
}
