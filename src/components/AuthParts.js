// 로그인·회원가입 화면이 같이 쓰는 작은 조각들
import { el } from '../lib/dom.js';
import { hasAllValues } from '../lib/validation.js';

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

// 폼 안의 입력값을 { name: value } 객체로 모은다
export function readForm(form) {
  return Object.fromEntries(new FormData(form));
}

// 필수 칸(requiredKeys)이 모두 채워져야 버튼이 눌리도록 한다
// 글자를 입력할 때마다(input 이벤트) 다시 확인
export function bindRequiredFields(form, button, requiredKeys) {
  function handleInput() {
    button.disabled = !hasAllValues(readForm(form), requiredKeys);
  }
  form.addEventListener('input', handleInput);
  handleInput(); // 처음엔 비어 있으므로 비활성화 상태로 시작
  return handleInput; // 전송이 끝난 뒤 버튼 상태를 되돌릴 때 다시 부른다
}
