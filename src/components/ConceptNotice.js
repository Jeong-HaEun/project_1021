// 모든 페이지에 고정으로 붙는 "비공식 컨셉" 고지 문구
export const CONCEPT_NOTICE_TEXT =
  '세시드 공식 사이트가 아닌 포트폴리오용 리디자인 컨셉입니다';

export function ConceptNotice() {
  const notice = document.createElement('p');
  notice.className = 'concept-notice';
  notice.setAttribute('role', 'note');
  notice.textContent = CONCEPT_NOTICE_TEXT;
  return notice;
}
