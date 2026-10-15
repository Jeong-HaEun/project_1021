// 게시글 한 개 — 내 글이면 수정·삭제 버튼이 보인다
import { el } from '../lib/dom.js';
import { formatDate, toKoreanError } from '../lib/validation.js';
import { deletePost, updatePost } from '../lib/posts.js';
import { PostForm } from './PostForm.js';

// onChange: 수정·삭제 뒤 목록을 새로고침하는 함수
export function PostItem({ post, currentUserId, onChange }) {
  const isMine = post.user_id === currentUserId;
  const item = el('li', { className: 'post-item' });
  const message = el('p', { className: 'form-message', role: 'status', 'aria-live': 'polite' });

  // 보기 모드
  function renderView() {
    // profiles는 본인 것만 읽을 수 있어서(RLS) 남의 닉네임 대신 '내 글' 표시만 한다
    const meta = [formatDate(post.created_at), isMine ? '내 글' : ''].filter(Boolean).join(' · ');
    item.replaceChildren(
      el('h2', { className: 'post-item__title', text: post.title }),
      el('p', { className: 'post-item__meta', text: meta }),
      el('p', { className: 'post-item__content', text: post.content }),
      isMine && el('div', { className: 'post-item__actions' }, [
        el('button', { type: 'button', className: 'btn-text', text: '수정', onClick: handleEdit }),
        el('button', { type: 'button', className: 'btn-text', text: '삭제', onClick: handleDelete }),
      ]),
      message,
    );
  }

  // 수정 모드: 같은 자리에 폼을 띄운다
  function handleEdit() {
    item.replaceChildren(PostForm({
      initial: post,
      submitLabel: '저장',
      onSave: async (values) => {
        await updatePost(post.id, values);
        onChange();
      },
      onCancel: renderView,
    }));
  }

  // 브라우저 confirm 창 대신, 버튼을 한 번 더 눌러야 지워지게 한다
  let deleteArmed = false;
  async function handleDelete(event) {
    if (!deleteArmed) {
      deleteArmed = true;
      event.currentTarget.textContent = '한 번 더 누르면 삭제';
      return;
    }
    try {
      await deletePost(post.id);
      onChange();
    } catch (error) {
      message.textContent = toKoreanError(error.message);
    }
  }

  renderView();
  return item;
}
