// 글쓰기·수정 폼 — 새 글과 수정에 같이 쓴다
import { el } from '../lib/dom.js';
import { LIMITS, toKoreanError, validatePost } from '../lib/validation.js';

// onSave: 저장 함수({title, content}), onCancel: 수정 취소 (새 글이면 없음)
export function PostForm({ initial = { title: '', content: '' }, submitLabel = '등록', onSave, onCancel }) {
  const uid = Math.random().toString(36).slice(2, 8); // 라벨-입력칸 연결용 고유 id
  const message = el('p', { className: 'form-message', role: 'status', 'aria-live': 'polite' });
  const titleInput = el('input', { id: `title-${uid}`, name: 'title', type: 'text', maxlength: LIMITS.titleMax });
  const contentInput = el('textarea', { id: `content-${uid}`, name: 'content', rows: '5', maxlength: LIMITS.contentMax });
  titleInput.value = initial.title;
  contentInput.value = initial.content;
  const submitButton = el('button', { type: 'submit', className: 'btn-primary', text: submitLabel });

  async function handleSubmit(event) {
    event.preventDefault();
    const values = { title: titleInput.value, content: contentInput.value };
    const problem = validatePost(values);
    if (problem) {
      message.textContent = problem;
      return;
    }
    submitButton.disabled = true;
    try {
      await onSave(values);
      form.reset();
      message.textContent = '';
    } catch (error) {
      message.textContent = toKoreanError(error.message);
    } finally {
      submitButton.disabled = false;
    }
  }

  const form = el('form', { className: 'post-form', novalidate: '', onSubmit: handleSubmit }, [
    el('div', { className: 'form-field' }, [el('label', { for: titleInput.id, text: '제목' }), titleInput]),
    el('div', { className: 'form-field' }, [el('label', { for: contentInput.id, text: '내용' }), contentInput]),
    el('div', { className: 'post-form__actions' }, [
      onCancel && el('button', { type: 'button', className: 'btn-text', text: '취소', onClick: onCancel }),
      submitButton,
    ]),
    message,
  ]);
  return form;
}
