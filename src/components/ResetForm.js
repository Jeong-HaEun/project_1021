// 비밀번호 재설정 화면 — 메일 속 링크를 누르면 도착하는 페이지
// 링크에 담긴 인증 정보로 Supabase가 "임시 로그인" 상태를 만들어 주고,
// 그 상태에서만 새 비밀번호로 바꿀 수 있다
import { el } from '../lib/dom.js';
import { onAuthChange, updatePassword } from '../lib/auth.js';
import { toKoreanError, validateNewPassword } from '../lib/validation.js';
import { AuthField, AuthLogo, AuthSwitchLink, bindRequiredFields, readForm } from './AuthParts.js';
import { showToast } from './Toast.js';

const BUTTON_TEXT = '비밀번호 변경';

// 만료된 링크로 들어오면 주소 # 뒤에 error_code가 붙어 온다
function getLinkError() {
  const params = new URLSearchParams(window.location.hash.slice(1));
  return params.get('error_code') || params.get('error');
}

export function ResetForm() {
  const body = el('div');
  const section = el('section', { className: 'auth', 'aria-labelledby': 'reset-title' }, [
    AuthLogo(),
    el('h1', { id: 'reset-title', className: 'auth__title', text: '비밀번호 재설정' }),
    body,
  ]);

  // 링크가 없거나 만료된 경우: 폼 대신 다시 요청하라는 안내
  function renderInvalid(text) {
    body.replaceChildren(
      el('p', { className: 'auth__desc', text }),
      AuthSwitchLink({ question: '', href: './forgot.html', label: '재설정 링크 다시 받기' }),
    );
  }

  function renderForm() {
    const submitButton = el('button', { type: 'submit', className: 'btn-primary', text: BUTTON_TEXT });
    const form = el('form', { className: 'auth-form', novalidate: '', onSubmit: handleSubmit }, [
      AuthField({ label: '새 비밀번호', name: 'password', type: 'password', autocomplete: 'new-password' }),
      AuthField({ label: '새 비밀번호 확인', name: 'passwordConfirm', type: 'password', autocomplete: 'new-password' }),
      submitButton,
    ]);
    const handleInput = bindRequiredFields(form, submitButton, ['password', 'passwordConfirm']);

    async function handleSubmit(event) {
      event.preventDefault();
      if (!handleInput()) return; // 필수 칸이 비었으면 눌러도 아무 일 없음
      const values = readForm(form);
      const problem = validateNewPassword(values);
      if (problem) {
        showToast(problem);
        return;
      }
      submitButton.disabled = true;
      submitButton.textContent = '변경 중…';
      try {
        await updatePassword(values.password);
        showToast('비밀번호가 변경됐습니다.', 'info');
        setTimeout(() => { window.location.href = './index.html'; }, 1500);
      } catch (error) {
        showToast(toKoreanError(error.message));
        submitButton.textContent = BUTTON_TEXT;
        handleInput();
      }
    }

    body.replaceChildren(form);
  }

  if (getLinkError()) {
    renderInvalid('재설정 링크가 만료됐거나 올바르지 않습니다.');
  } else {
    body.replaceChildren(el('p', { className: 'auth__desc', text: '링크를 확인하는 중…' }));
    // Supabase가 주소의 인증 정보를 읽고 나면 알려준다 → 로그인 상태면 폼 표시
    // 비밀번호 변경 뒤에도 알림이 한 번 더 오므로, 폼은 처음 한 번만 그린다
    let formShown = false;
    onAuthChange((user) => {
      if (formShown) return;
      if (user) {
        formShown = true;
        renderForm();
        return;
      }
      renderInvalid('재설정 링크로 접속해 주세요. 링크는 비밀번호 찾기에서 받을 수 있습니다.');
    });
  }

  return section;
}
