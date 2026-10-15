// 로그인 화면 — 로고, 이메일, 비밀번호, 로그인 버튼, 회원가입 링크
// 지금은 화면만 있고 실제 로그인 기능은 아직 연결하지 않았다
import { el } from '../lib/dom.js';
import { AuthField, AuthLogo, AuthSwitchLink, handleSubmitPlaceholder } from './AuthParts.js';

export function LoginForm() {
  return el('section', { className: 'auth', 'aria-labelledby': 'login-title' }, [
    AuthLogo(),
    el('h1', { id: 'login-title', className: 'auth__title', text: '로그인' }),
    el('form', { className: 'auth-form', novalidate: '', onSubmit: handleSubmitPlaceholder }, [
      AuthField({ label: '이메일', name: 'email', type: 'email', autocomplete: 'email' }),
      AuthField({ label: '비밀번호', name: 'password', type: 'password', autocomplete: 'current-password' }),
      el('button', { type: 'submit', className: 'btn-primary', text: '로그인' }),
    ]),
    AuthSwitchLink({ question: '아직 회원이 아니신가요?', href: './signup.html', label: '회원가입' }),
  ]);
}
