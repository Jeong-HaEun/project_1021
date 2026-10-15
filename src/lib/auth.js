// 회원가입·로그인 기능 — Supabase Auth가 비밀번호를 안전하게 관리한다
// (비밀번호를 우리가 만든 테이블에 저장하지 않는다)
import { supabase } from './supabase.js';

// 회원가입: 닉네임은 metadata로 넘기면 DB 트리거가 profiles에 자동 저장한다
export async function signUp({ email, password, nickname }) {
  const { data, error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: { data: { nickname: nickname.trim() } },
  });
  if (error) throw error;
  // session이 없으면 이메일 인증이 필요한 설정이라는 뜻
  return { needsEmailConfirm: !data.session };
}

export async function signIn({ email, password }) {
  const { error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });
  if (error) throw error;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

// 비밀번호 재설정 메일 발송
// 메일 속 링크를 누르면 reset.html로 돌아오도록 주소를 함께 보낸다
// (현재 페이지 기준 상대 주소라 개발 서버·GitHub Pages 둘 다 동작)
// ⚠ 이 주소는 Supabase 대시보드 Redirect URLs에 등록돼 있어야 한다
export async function sendPasswordReset(email) {
  const redirectTo = new URL('./reset.html', window.location.href).href;
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo });
  if (error) throw error;
}

// 새 비밀번호로 변경 — 재설정 링크로 들어와 임시 로그인된 상태에서만 가능
export async function updatePassword(password) {
  const { error } = await supabase.auth.updateUser({ password });
  if (error) throw error;
}

// 지금 로그인한 사용자 (없으면 null)
export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();
  return data.session?.user ?? null;
}

// 내 닉네임 — profiles RLS 때문에 본인 것만 읽을 수 있다
export async function getMyNickname(userId) {
  const { data, error } = await supabase
    .from('profiles')
    .select('nickname')
    .eq('id', userId)
    .maybeSingle();
  if (error) throw error;
  return data?.nickname ?? '';
}

// 처음 열 때 + 로그인·로그아웃이 일어날 때마다 callback 실행
// setTimeout으로 한 박자 늦추는 이유: 이 알림 안에서 바로 DB를 부르면
// Supabase 내부 잠금과 겹쳐 멈출 수 있어서 (Supabase 공식 권장 방식)
export function onAuthChange(callback) {
  supabase.auth.onAuthStateChange((_event, session) => {
    setTimeout(() => callback(session?.user ?? null), 0);
  });
}
