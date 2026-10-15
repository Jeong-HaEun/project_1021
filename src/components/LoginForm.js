// 로그인 화면 — 로고, 환영·혜택, 이메일, 비밀번호, 로그인 버튼, 카카오 로그인,
// 아이디·비밀번호 찾기, 회원가입 링크
import { el } from '../lib/dom.js';
import { signIn } from '../lib/auth.js';
import { toKoreanError, validateLogin } from '../lib/validation.js';
import { AuthField, AuthLogo, AuthSwitchLink, bindRequiredFields, readForm } from './AuthParts.js';
import { showToast } from './Toast.js';
import { WelcomeBenefits } from './WelcomeBenefits.js';
import { KakaoLoginButton } from './KakaoLoginButton.js';

// 두 칸을 모두 입력해야 로그인 버튼이 눌린다
const REQUIRED = ['email', 'password'];

export function LoginForm() {
  const submitButton = el('button', { type: 'submit', className: 'btn-primary', text: '로그인' });
  const form = el('form', { className: 'auth-form', novalidate: '', onSubmit: handleSubmit }, [
    AuthField({ label: '이메일', name: 'email', type: 'email', autocomplete: 'email' }),
    AuthField({ label: '비밀번호', name: 'password', type: 'password', autocomplete: 'current-password' }),
    submitButton,
  ]);
  const handleInput = bindRequiredFields(form, submitButton, REQUIRED);

  async function handleSubmit(event) {
    event.preventDefault(); // 페이지 새로고침 막기
    if (!handleInput()) return; // 필수 칸이 비었으면 눌러도 아무 일 없음
    const values = readForm(form);

    // 1) 서버에 보내기 전에 형식 확인 (이메일 모양, 비밀번호 길이)
    const problem = validateLogin(values);
    if (problem) {
      showToast(problem);
      return;
    }

    // 2) 보내는 동안 버튼을 잠가 중복 클릭 방지
    submitButton.disabled = true;
    submitButton.textContent = '로그인 중…';
    try {
      await signIn(values);
      window.location.href = './index.html'; // 성공 → 메인으로
    } catch (error) {
      showToast(toKoreanError(error.message)); // 실패 → 한국어 토스트
      submitButton.textContent = '로그인';
      handleInput(); // 입력 상태에 맞게 버튼 다시 활성화
    }
  }

  return el('section', { className: 'auth auth--login', 'aria-labelledby': 'login-title' }, [
    AuthLogo(),
    WelcomeBenefits(), // 환영 문구 + 신규 회원 혜택 (제목 h1 포함)
    form,
    KakaoLoginButton(), // 로그인 버튼 바로 아래
    // 회원가입 링크 위에 아이디 찾기 · 비밀번호 찾기
    el('p', { className: 'auth__switch auth__find' }, [
      el('a', { href: './find-id.html', text: '아이디 찾기' }),
      el('span', { 'aria-hidden': 'true', text: '·' }),
      el('a', { href: './forgot.html', text: '비밀번호 찾기' }),
    ]),
    AuthSwitchLink({ question: '아직 회원이 아니신가요?', href: './signup.html', label: '회원가입' }),
  ]);
}
