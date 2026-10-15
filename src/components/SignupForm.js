// 회원가입 화면 — 로고, 이메일, 비밀번호, 비밀번호 확인, 닉네임, 회원가입 버튼, 로그인 링크
import { el } from '../lib/dom.js';
import { signUp } from '../lib/auth.js';
import { LIMITS, toKoreanError, validateSignup } from '../lib/validation.js';
import { AuthField, AuthLogo, AuthSwitchLink, bindRequiredFields, readForm } from './AuthParts.js';
import { showToast } from './Toast.js';

// CLAUDE.md에 정해진 안내 문구 (테스트로 지켜진다)
export const DEMO_WARNING_TEXT =
  '실습용 데모 페이지입니다. 실제 개인정보를 입력하지 마세요';

// 이 세 칸을 모두 입력해야 회원가입 버튼이 눌린다 (닉네임은 선택)
const REQUIRED = ['email', 'password', 'passwordConfirm'];

export function SignupForm() {
  const submitButton = el('button', { type: 'submit', className: 'btn-primary', text: '회원가입' });
  const form = el('form', { className: 'auth-form', novalidate: '', onSubmit: handleSubmit }, [
    AuthField({ label: '이메일', name: 'email', type: 'email', autocomplete: 'email' }),
    AuthField({ label: '비밀번호', name: 'password', type: 'password', autocomplete: 'new-password' }),
    AuthField({ label: '비밀번호 확인', name: 'passwordConfirm', type: 'password', autocomplete: 'new-password' }),
    AuthField({
      label: '닉네임 (선택)', name: 'nickname', type: 'text', autocomplete: 'nickname', maxlength: LIMITS.nicknameMax,
    }),
    submitButton,
  ]);
  const handleInput = bindRequiredFields(form, submitButton, REQUIRED);

  async function handleSubmit(event) {
    event.preventDefault(); // 페이지 새로고침 막기
    if (!handleInput()) return; // 필수 칸이 비었으면 눌러도 아무 일 없음
    const values = readForm(form);

    // 1) 비밀번호 일치 → 이메일 형식 → 비밀번호 길이 → 닉네임 길이 순으로 확인
    const problem = validateSignup(values);
    if (problem) {
      showToast(problem);
      return;
    }

    // 2) 보내는 동안 버튼을 잠가 중복 가입 방지
    submitButton.disabled = true;
    submitButton.textContent = '가입 중…';
    try {
      const { needsEmailConfirm } = await signUp(values);
      if (needsEmailConfirm) {
        // Supabase의 이메일 인증 설정이 켜져 있으면 바로 로그인되지 않는다 → 안내 후 이동
        showToast('가입이 완료됐습니다. 이메일 인증 후 로그인해 주세요.', 'info');
        setTimeout(() => { window.location.href = './index.html'; }, 2000);
        return;
      }
      window.location.href = './index.html'; // 성공 → 메인으로
    } catch (error) {
      showToast(toKoreanError(error.message)); // 실패 → 한국어 토스트
      submitButton.textContent = '회원가입';
      handleInput();
    }
  }

  return el('section', { className: 'auth', 'aria-labelledby': 'signup-title' }, [
    AuthLogo(),
    el('h1', { id: 'signup-title', className: 'auth__title', text: '회원가입' }),
    el('p', { className: 'demo-warning', role: 'note', text: DEMO_WARNING_TEXT }),
    form,
    AuthSwitchLink({ question: '이미 회원이신가요?', href: './login.html', label: '로그인' }),
  ]);
}
