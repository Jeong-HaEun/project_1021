// 비밀번호 찾기 화면 — 이메일을 입력하면 재설정 링크를 메일로 보낸다
import { el } from '../lib/dom.js';
import { sendPasswordReset } from '../lib/auth.js';
import { toKoreanError, validateEmail } from '../lib/validation.js';
import { AuthField, AuthLogo, AuthSwitchLink, bindRequiredFields, readForm } from './AuthParts.js';
import { showToast } from './Toast.js';

const BUTTON_TEXT = '재설정 링크 보내기';

export function ForgotForm() {
  const submitButton = el('button', { type: 'submit', className: 'btn-primary', text: BUTTON_TEXT });
  const form = el('form', { className: 'auth-form', novalidate: '', onSubmit: handleSubmit }, [
    AuthField({ label: '이메일', name: 'email', type: 'email', autocomplete: 'email' }),
    submitButton,
  ]);
  const handleInput = bindRequiredFields(form, submitButton, ['email']);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!handleInput()) return; // 필수 칸이 비었으면 눌러도 아무 일 없음
    const { email } = readForm(form);
    const problem = validateEmail(email);
    if (problem) {
      showToast(problem);
      return;
    }

    submitButton.disabled = true;
    submitButton.textContent = '보내는 중…';
    try {
      await sendPasswordReset(email);
      // 보안상 Supabase는 가입되지 않은 이메일이어도 성공으로 응답한다
      // → "가입된 이메일인지"를 화면에서 알려주지 않는 것이 맞다
      showToast('재설정 링크를 보냈습니다. 메일함을 확인해 주세요.', 'info');
    } catch (error) {
      showToast(toKoreanError(error.message));
    } finally {
      submitButton.textContent = BUTTON_TEXT;
      handleInput();
    }
  }

  return el('section', { className: 'auth', 'aria-labelledby': 'forgot-title' }, [
    AuthLogo(),
    el('h1', { id: 'forgot-title', className: 'auth__title', text: '비밀번호 찾기' }),
    el('p', { className: 'auth__desc', text: '가입한 이메일을 입력하면 비밀번호를 다시 설정할 수 있는 링크를 보내드립니다.' }),
    form,
    AuthSwitchLink({ question: '비밀번호가 기억나셨나요?', href: './login.html', label: '로그인' }),
  ]);
}
