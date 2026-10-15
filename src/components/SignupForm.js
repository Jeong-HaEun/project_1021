// 회원가입 화면 — 로고, 이메일, 비밀번호, 비밀번호 확인, 닉네임, 회원가입 버튼, 로그인 링크
// 지금은 화면만 있고 실제 회원가입 기능은 아직 연결하지 않았다
import { el } from '../lib/dom.js';
import { LIMITS } from '../lib/validation.js';
import { AuthField, AuthLogo, AuthSwitchLink, handleSubmitPlaceholder } from './AuthParts.js';

// CLAUDE.md에 정해진 안내 문구 (테스트로 지켜진다)
export const DEMO_WARNING_TEXT =
  '실습용 데모 페이지입니다. 실제 개인정보를 입력하지 마세요';

export function SignupForm() {
  return el('section', { className: 'auth', 'aria-labelledby': 'signup-title' }, [
    AuthLogo(),
    el('h1', { id: 'signup-title', className: 'auth__title', text: '회원가입' }),
    el('p', { className: 'demo-warning', role: 'note', text: DEMO_WARNING_TEXT }),
    el('form', { className: 'auth-form', novalidate: '', onSubmit: handleSubmitPlaceholder }, [
      AuthField({ label: '이메일', name: 'email', type: 'email', autocomplete: 'email' }),
      AuthField({ label: '비밀번호', name: 'password', type: 'password', autocomplete: 'new-password' }),
      AuthField({ label: '비밀번호 확인', name: 'passwordConfirm', type: 'password', autocomplete: 'new-password' }),
      AuthField({
        label: '닉네임', name: 'nickname', type: 'text', autocomplete: 'nickname', maxlength: LIMITS.nicknameMax,
      }),
      el('button', { type: 'submit', className: 'btn-primary', text: '회원가입' }),
    ]),
    AuthSwitchLink({ question: '이미 회원이신가요?', href: './login.html', label: '로그인' }),
  ]);
}
