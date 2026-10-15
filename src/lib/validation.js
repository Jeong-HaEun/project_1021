// 입력값 검사 — 화면(DOM)과 상관없는 순수 함수라 테스트로 확인한다.
// 서버에 보내기 전에 걸러서, 사용자에게 바로 쉬운 말로 알려준다.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const LIMITS = {
  passwordMin: 6, // Supabase 기본 최소 길이
  nicknameMax: 20,
  titleMax: 100,
  contentMax: 2000,
};

// 문제가 없으면 빈 문자열, 있으면 안내 문구를 돌려준다
export function validateEmail(email) {
  if (!email.trim()) return '이메일을 입력해 주세요.';
  if (!EMAIL_PATTERN.test(email.trim())) return '이메일 형식이 올바르지 않습니다.';
  return '';
}

export function validatePassword(password) {
  if (password.length < LIMITS.passwordMin) {
    return `비밀번호는 ${LIMITS.passwordMin}자 이상이어야 합니다.`;
  }
  return '';
}

// 닉네임은 선택 입력: 비워 두면 DB가 '사용자_xxxx'로 자동 생성, 입력했다면 길이만 확인
export function validateNickname(nickname = '') {
  if (nickname.trim().length > LIMITS.nicknameMax) {
    return `닉네임은 ${LIMITS.nicknameMax}자 이하로 입력해 주세요.`;
  }
  return '';
}

// 비밀번호와 비밀번호 확인이 같은지
export function validatePasswordConfirm(password, passwordConfirm) {
  return password === passwordConfirm ? '' : '비밀번호가 일치하지 않습니다.';
}

// 필수 칸(keys)이 모두 채워졌는지 → 버튼 활성화 여부 판단에 사용
// 비밀번호는 공백도 글자로 인정하므로, 이메일만 앞뒤 공백을 지우고 본다
export function hasAllValues(values, keys) {
  return keys.every((key) => {
    const value = values[key] ?? '';
    return key === 'email' ? value.trim() !== '' : value !== '';
  });
}

// 로그인: 이메일 + 비밀번호
export function validateLogin({ email, password }) {
  return validateEmail(email) || validatePassword(password);
}

// 회원가입: 비밀번호 일치를 가장 먼저 확인 → 이메일·비밀번호 형식 → 닉네임 길이
export function validateSignup({ email, password, passwordConfirm, nickname }) {
  return (
    validatePasswordConfirm(password, passwordConfirm) ||
    validateLogin({ email, password }) ||
    validateNickname(nickname)
  );
}

// 게시글: 제목과 내용 모두 필요, 길이 제한
export function validatePost({ title, content }) {
  if (!title.trim()) return '제목을 입력해 주세요.';
  if (title.trim().length > LIMITS.titleMax) {
    return `제목은 ${LIMITS.titleMax}자 이하로 입력해 주세요.`;
  }
  if (!content.trim()) return '내용을 입력해 주세요.';
  if (content.trim().length > LIMITS.contentMax) {
    return `내용은 ${LIMITS.contentMax}자 이하로 입력해 주세요.`;
  }
  return '';
}

// Supabase가 주는 영어 오류를 쉬운 한국어로 바꾼다
const ERROR_MESSAGES = [
  ['Invalid login credentials', '이메일 또는 비밀번호가 맞지 않습니다.'],
  ['Email not confirmed', '이메일 인증이 아직 완료되지 않았습니다.'],
  ['User already registered', '이미 가입된 이메일입니다.'],
  ['Password should be at least', `비밀번호는 ${LIMITS.passwordMin}자 이상이어야 합니다.`],
  ['weak password', '더 안전한 비밀번호를 사용해 주세요.'],
  ['is invalid', '사용할 수 없는 이메일 주소입니다.'],
  ['Signups not allowed', '현재 회원가입이 비활성화되어 있습니다.'],
  ['Failed to fetch', '네트워크 연결을 확인해 주세요.'],
  ['rate limit', '요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.'],
  ['row-level security', '권한이 없습니다. 로그인 상태를 확인해 주세요.'],
];

export function toKoreanError(message = '') {
  const lower = message.toLowerCase();
  const found = ERROR_MESSAGES.find(([key]) => lower.includes(key.toLowerCase()));
  return found ? found[1] : '문제가 발생했습니다. 잠시 후 다시 시도해 주세요.';
}

// 작성일 표시: 2026.10.15 형식
export function formatDate(isoString) {
  const date = new Date(isoString);
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}
