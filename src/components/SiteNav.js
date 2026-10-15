// 상단 내비게이션 — 로그인 상태에 따라 오른쪽 메뉴가 바뀐다
import { el } from '../lib/dom.js';
import { getMyNickname, onAuthChange, signOut } from '../lib/auth.js';

// 페이지들이 모두 같은 폴더에 있으므로 상대 경로로 연결 (GitHub Pages 하위 주소에서도 동작)
const LINKS = [
  { href: './index.html', label: 'Home' },
  { href: './board.html', label: '게시판' },
];

export function SiteNav() {
  const userArea = el('div', { className: 'site-nav__user' });
  const nav = el('header', { className: 'site-nav' }, [
    el('a', { className: 'site-nav__brand', href: './index.html', text: 'Cecith Concept' }),
    el('nav', { 'aria-label': '주요 메뉴' }, [
      el('ul', { className: 'site-nav__links' },
        LINKS.map((link) => el('li', {}, el('a', { href: link.href, text: link.label })))),
    ]),
    userArea,
  ]);

  async function handleLogout() {
    await signOut();
    window.location.href = './index.html';
  }

  // 로그인 상태가 바뀔 때마다 오른쪽 영역을 다시 그린다
  async function renderUser(user) {
    if (!user) {
      userArea.replaceChildren(el('a', { href: './login.html', text: '로그인' }));
      return;
    }
    const nickname = await getMyNickname(user.id).catch(() => '');
    userArea.replaceChildren(
      el('span', { className: 'site-nav__name', text: `${nickname || '회원'}님` }),
      el('button', { type: 'button', className: 'btn-text', text: '로그아웃', onClick: handleLogout }),
    );
  }

  // 처음 열 때도 한 번 알려주므로 따로 getCurrentUser를 부를 필요 없다
  onAuthChange(renderUser);
  return nav;
}
