// 아이디 찾기 화면 — 이 사이트의 아이디는 "가입한 이메일"이다
// 닉네임 등으로 이메일을 알려주면 남의 이메일을 알아낼 수 있어(개인정보 노출)
// 조회 기능 대신 어떤 방법으로 로그인하면 되는지 안내만 한다
import { el } from '../lib/dom.js';
import { AuthLogo, AuthSwitchLink } from './AuthParts.js';

const GUIDES = [
  { title: '이메일로 가입하셨나요?', text: '가입할 때 입력한 이메일 주소가 아이디입니다. 메일함에서 가입 안내 메일을 찾아보세요.' },
  { title: '카카오로 가입하셨나요?', text: '로그인 화면의 "카카오 로그인" 버튼을 눌러 주세요. 따로 아이디가 없습니다.' },
  { title: '비밀번호가 기억나지 않나요?', text: '비밀번호 찾기에서 이메일을 입력하면 재설정 링크를 보내드립니다.' },
];

export function FindIdInfo() {
  return el('section', { className: 'auth', 'aria-labelledby': 'find-id-title' }, [
    AuthLogo(),
    el('h1', { id: 'find-id-title', className: 'auth__title', text: '아이디 찾기' }),
    el('ul', { className: 'find-id__list' }, GUIDES.map(({ title, text }) => el('li', { className: 'find-id__item' }, [
      el('h2', { className: 'find-id__title', text: title }),
      el('p', { className: 'find-id__text', text }),
    ]))),
    el('a', { className: 'btn-primary btn-link btn-block', href: './forgot.html', text: '비밀번호 찾기' }),
    AuthSwitchLink({ question: '아이디를 확인하셨나요?', href: './login.html', label: '로그인' }),
  ]);
}
