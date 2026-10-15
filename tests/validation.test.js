import { describe, it, expect } from 'vitest';
import {
  formatDate,
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

// 회원가입 입력 검사 (닉네임 추가)
describe('validateSignup', () => {
  const base = { email: 'demo@example.com', password: '123456' };
  it('닉네임이 비면 안내', () => {
    expect(validateSignup({ ...base, nickname: '  ' })).toBe('닉네임을 입력해 주세요.');
  });
  it('닉네임이 20자를 넘으면 안내', () => {
    expect(validateSignup({ ...base, nickname: 'a'.repeat(21) })).toContain('20자 이하');
  });
  it('모두 올바르면 빈 문자열', () => {
    expect(validateSignup({ ...base, nickname: '테스트' })).toBe('');
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
  it('모르는 오류는 일반 안내', () => {
    expect(toKoreanError('something odd')).toContain('잠시 후 다시');
  });
});

describe('formatDate', () => {
  it('YYYY.MM.DD 형식으로 바꾼다', () => {
    expect(formatDate('2026-10-05T12:00:00')).toBe('2026.10.05');
  });
});
