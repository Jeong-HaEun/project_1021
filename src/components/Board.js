// 게시판 전체 — 글쓰기 영역 + 글 목록
import { el } from '../lib/dom.js';
import { onAuthChange } from '../lib/auth.js';
import { listPosts } from '../lib/posts.js';
import { toKoreanError } from '../lib/validation.js';
import { PostItem } from './PostItem.js';

export function Board() {
  let currentUserId = null;
  const writeArea = el('div', { className: 'board__actions' });
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

  // 글쓰기 폼은 펼쳐두지 않고 버튼만 둔다 → 누르면 글쓰기 페이지로 이동
  // 로그인 전이면 같은 버튼이 로그인 페이지로 안내한다
  function renderWriteArea() {
    writeArea.replaceChildren(...[
      el('a', {
        className: 'btn-primary btn-link',
        href: currentUserId ? './write.html' : './login.html',
        text: '글쓰기',
      }),
      !currentUserId && el('span', { className: 'board__login-hint', text: '로그인 후 글을 쓸 수 있습니다.' }),
    ].filter(Boolean));
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
