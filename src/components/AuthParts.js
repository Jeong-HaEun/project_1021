// 로그인·회원가입 화면이 같이 쓰는 작은 조각들
import { el } from '../lib/dom.js';

// 로고 텍스트 — 원본 로고 이미지 대신 글자로만 표시. 누르면 메인으로 이동
export function AuthLogo() {
  return el('a', { className: 'auth__logo', href: './index.html', text: 'Cecith Concept' });
}

// 라벨 + 입력칸 한 줄 (라벨을 누르면 입력칸에 커서가 가도록 id로 연결)
export function AuthField({ label, name, type, autocomplete, maxlength }) {
  const id = `auth-${name}`;
  const input = el('input', { id, name, type, autocomplete });
  if (maxlength) input.setAttribute('maxlength', maxlength);
  return el('div', { className: 'form-field' }, [el('label', { for: id, text: label }), input]);
}

// 폼 아래 "다른 페이지로 이동" 안내 줄
export function AuthSwitchLink({ question, href, label }) {
  return el('p', { className: 'auth__switch' }, [question, ' ', el('a', { href, text: label })]);
}

// 아직 기능을 연결하지 않았으므로, 버튼을 눌러도 페이지가 새로고침되지 않게만 막는다
// (로그인·회원가입 기능은 다음 단계에서 이 자리에 연결)
export function handleSubmitPlaceholder(event) {
  event.preventDefault();
}
