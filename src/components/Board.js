// 게시판 전체 — 글쓰기 영역 + 글 목록
import { el } from '../lib/dom.js';
import { onAuthChange } from '../lib/auth.js';
import { createPost, listPosts } from '../lib/posts.js';
import { toKoreanError } from '../lib/validation.js';
import { PostForm } from './PostForm.js';
import { PostItem } from './PostItem.js';

export function Board() {
  let currentUserId = null;
  const writeArea = el('div', { className: 'board__write' });
  const list = el('ul', { className: 'board__list' });
  const status = el('p', { className: 'board__status', role: 'status', 'aria-live': 'polite' });

  // 목록을 DB에서 다시 불러와 그린다
  async function refresh() {
    status.textContent = '불러오는 중…';
    try {
      const posts = await listPosts();
      list.replaceChildren(...posts.map((post) => PostItem({ post, currentUserId, onChange: refresh })));
      status.textContent = posts.length ? '' : '아직 글이 없습니다.';
    } catch (error) {
      status.textContent = toKoreanError(error.message);
    }
  }

  // 로그인한 사람에게만 글쓰기 폼, 아니면 로그인 안내
  function renderWriteArea() {
    if (currentUserId) {
      writeArea.replaceChildren(PostForm({
        onSave: async (values) => {
          await createPost(values);
          refresh();
        },
      }));
    } else {
      writeArea.replaceChildren(el('p', { className: 'board__login-hint' }, [
        '글을 쓰려면 ',
        el('a', { href: './login.html', text: '로그인' }),
        '해 주세요.',
      ]));
    }
  }

  onAuthChange((user) => {
    currentUserId = user?.id ?? null;
    renderWriteArea();
    refresh();
  });

  return el('section', { className: 'board' }, [
    el('h1', { className: 'board__title', text: 'Board' }),
    el('p', { className: 'board__desc', text: 'Supabase 연동 실습용 게시판입니다.' }),
    writeArea,
    status,
    list,
  ]);
}
