// 글쓰기 페이지 — 게시판의 "글쓰기" 버튼을 누르면 오는 곳
// 등록하거나 취소하면 게시판으로 돌아간다
import { el } from '../lib/dom.js';
import { onAuthChange } from '../lib/auth.js';
import { createPost } from '../lib/posts.js';
import { PostForm } from './PostForm.js';

const BOARD_URL = './board.html';

export function WritePost() {
  const body = el('div', { className: 'board__write' });

  function handleCancel() {
    window.location.href = BOARD_URL;
  }

  // 로그인한 사람만 폼을 보여주고, 아니면 로그인 안내
  // (화면에서 막는 것과 별개로, DB의 RLS도 비로그인 작성을 거부한다)
  onAuthChange((user) => {
    if (user) {
      body.replaceChildren(PostForm({
        onSave: async (values) => {
          await createPost(values);
          window.location.href = BOARD_URL;
        },
        onCancel: handleCancel,
      }));
    } else {
      body.replaceChildren(el('p', { className: 'board__login-hint' }, [
        '글을 쓰려면 ',
        el('a', { href: './login.html', text: '로그인' }),
        '해 주세요.',
      ]));
    }
  });

  return el('section', { className: 'board' }, [
    el('h1', { className: 'board__title', text: 'Write' }),
    el('p', { className: 'board__desc', text: '새 글을 작성합니다.' }),
    body,
  ]);
}
