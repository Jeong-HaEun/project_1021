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

// 필수 칸(requiredKeys)이 모두 채워져야 버튼이 동작하도록 한다
//
// disabled 대신 aria-disabled를 쓰는 이유:
// 크롬 자동완성은 사용자가 페이지를 한 번 클릭하기 전까지 값을 JS에 숨기고
// input 이벤트도 보내지 않는다. disabled로 잠그면 자동완성 상태에서 영영 누를 수 없게 된다.
// → 겉모습만 비활성으로 보여주고, 실제로 눌렸을 때 다시 확인해서 비어 있으면 무시한다.
export function bindRequiredFields(form, button, requiredKeys) {
  // 버튼 상태를 갱신하고, 지금 제출 가능한지(true/false) 돌려준다
  function handleInput() {
    const ready = hasAllValues(readForm(form), requiredKeys);
    button.disabled = false; // 전송 중 잠금 해제
    button.setAttribute('aria-disabled', String(!ready));
    return ready;
  }
  // 직접 입력(input), 자동완성 후 값 확정(change), 칸을 누를 때(focusin) 모두 다시 확인
  ['input', 'change', 'focusin'].forEach((type) => form.addEventListener(type, handleInput));
  handleInput(); // 처음엔 비어 있으므로 비활성 모습으로 시작
  return handleInput; // 제출할 때·전송이 끝난 뒤 다시 부른다
}
