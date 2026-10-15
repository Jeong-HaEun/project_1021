import { describe, it, expect } from 'vitest';
import {
  formatDate,
  hasAllValues,
  toKoreanError,
  validateLogin,
  validatePost,
  validateSignup,
} from '../src/lib/validation.js';

// 로그인 입력 검사
describe('validateLogin', () => {
  it('올바른 값이면 빈 문자열', () => {
    expect(validateLogin({ email: 'demo@example.com', password: '123456' })).toBe('');
  });
  it('이메일이 비면 안내', () => {
    expect(validateLogin({ email: ' ', password: '123456' })).toBe('이메일을 입력해 주세요.');
  });
  it('이메일 형식이 틀리면 안내', () => {
    expect(validateLogin({ email: 'demo@', password: '123456' })).toContain('형식');
  });
  it('비밀번호가 6자 미만이면 안내', () => {
    expect(validateLogin({ email: 'demo@example.com', password: '12345' })).toContain('6자 이상');
  });
});

// 회원가입 입력 검사 (비밀번호 확인 + 선택 닉네임)
describe('validateSignup', () => {
  const base = { email: 'demo@example.com', password: '123456', passwordConfirm: '123456' };
  it('비밀번호가 서로 다르면 안내', () => {
    expect(validateSignup({ ...base, passwordConfirm: '654321' })).toBe('비밀번호가 일치하지 않습니다.');
  });
  it('비밀번호 불일치를 다른 오류보다 먼저 알려준다', () => {
    expect(validateSignup({ ...base, email: 'demo@', passwordConfirm: 'x' })).toBe('비밀번호가 일치하지 않습니다.');
  });
  it('닉네임은 비워도 된다', () => {
    expect(validateSignup({ ...base, nickname: '' })).toBe('');
  });
  it('닉네임이 20자를 넘으면 안내', () => {
    expect(validateSignup({ ...base, nickname: 'a'.repeat(21) })).toContain('20자 이하');
  });
  it('모두 올바르면 빈 문자열', () => {
    expect(validateSignup({ ...base, nickname: '테스트' })).toBe('');
  });
});

// 버튼 활성화 조건: 필수 칸이 모두 채워졌는지
describe('hasAllValues', () => {
  const keys = ['email', 'password', 'passwordConfirm'];
  it('모두 채우면 true', () => {
    expect(hasAllValues({ email: 'a@b.co', password: '1', passwordConfirm: '1' }, keys)).toBe(true);
  });
  it('하나라도 비면 false', () => {
    expect(hasAllValues({ email: 'a@b.co', password: '1', passwordConfirm: '' }, keys)).toBe(false);
  });
  it('이메일이 공백뿐이면 false', () => {
    expect(hasAllValues({ email: '   ', password: '1', passwordConfirm: '1' }, keys)).toBe(false);
  });
  it('칸 자체가 없어도 false', () => {
    expect(hasAllValues({ email: 'a@b.co' }, ['email', 'password'])).toBe(false);
  });
});

// 게시글 입력 검사
describe('validatePost', () => {
  it('제목이 비면 안내', () => {
    expect(validatePost({ title: '', content: '내용' })).toBe('제목을 입력해 주세요.');
  });
  it('내용이 비면 안내', () => {
    expect(validatePost({ title: '제목', content: '   ' })).toBe('내용을 입력해 주세요.');
  });
  it('제목이 100자를 넘으면 안내', () => {
    expect(validatePost({ title: 'a'.repeat(101), content: '내용' })).toContain('100자 이하');
  });
  it('올바르면 빈 문자열', () => {
    expect(validatePost({ title: '제목', content: '내용' })).toBe('');
  });
});

// 영어 오류 → 한국어
describe('toKoreanError', () => {
  it('로그인 실패 메시지를 바꾼다', () => {
    expect(toKoreanError('Invalid login credentials')).toBe('이메일 또는 비밀번호가 맞지 않습니다.');
  });
  it('RLS 거부는 권한 안내로 바꾼다', () => {
    expect(toKoreanError('new row violates row-level security policy')).toContain('권한');
  });
  it('이미 가입된 이메일을 알려준다', () => {
    expect(toKoreanError('User already registered')).toBe('이미 가입된 이메일입니다.');
  });
  it('네트워크 오류를 알려준다', () => {
    expect(toKoreanError('Failed to fetch')).toContain('네트워크');
  });
  it('모르는 오류는 일반 안내', () => {
    expect(toKoreanError('something odd')).toContain('잠시 후 다시');
  });
});

describe('formatDate', () => {
  it('YYYY.MM.DD 형식으로 바꾼다', () => {
    expect(formatDate('2026-10-05T12:00:00')).toBe('2026.10.05');
  });
});
