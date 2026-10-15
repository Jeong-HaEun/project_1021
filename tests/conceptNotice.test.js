import { describe, it, expect } from 'vitest';
import { CONCEPT_NOTICE_TEXT } from '../src/components/ConceptNotice.js';

// 고지 문구가 실수로 바뀌거나 지워지지 않았는지 확인
describe('비공식 컨셉 고지 문구', () => {
  it('CLAUDE.md에 정해진 문구와 정확히 같다', () => {
    expect(CONCEPT_NOTICE_TEXT).toBe(
      '세시드 공식 사이트가 아닌 포트폴리오용 리디자인 컨셉입니다',
    );
  });
});
