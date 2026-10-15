// 상단 내비게이션 — 메뉴 5개 + 오른쪽 작은 영역(로그인·장바구니)
// 로그인 상태에 따라 오른쪽 로그인 영역이 바뀐다
import { el } from '../lib/dom.js';
import { getMyNickname, onAuthChange, signOut } from '../lib/auth.js';
import { showToast } from './Toast.js';

// 페이지들이 모두 같은 폴더에 있으므로 상대 경로로 연결 (GitHub Pages 하위 주소에서도 동작)
// 제품·루틴·가이드·브랜드는 아직 "준비 중" 페이지 → 한 페이지씩 채워 나간다
export const NAV_LINKS = [
  { href: './products.html', label: '제품' },
  { href: './routine.html', label: '루틴' },
  { href: './guides.html', label: '피부장벽 가이드' },
  { href: './brand.html', label: '브랜드 이야기' },
  { href: './board.html', label: '여러분의 이야기' },
];

// 지금 보고 있는 페이지의 메뉴에 표시 (화면낭독기에도 "현재 페이지"로 읽힌다)
function isCurrent(href) {
  return window.location.pathname.endsWith(href.replace('./', '/'));
}

export function SiteNav() {
  const loginArea = el('span', { className: 'site-nav__login' });

  // 장바구니: 모양만 있는 버튼 (CLAUDE.md 구매·장바구니 기능 금지 → 담기·결제 없음)
  // 디자인 시안으로 위치만 보여주고, 누르면 안내 토스트를 띄운다
  function handleCartClick() {
    showToast('이 컨셉 사이트에서는 구매 기능을 제공하지 않습니다.', 'info');
  }

  const nav = el('header', { className: 'site-nav' }, [
    el('a', { className: 'site-nav__brand', href: './index.html', text: 'Cecith Concept' }),
    el('nav', { className: 'site-nav__menu', 'aria-label': '주요 메뉴' }, [
      el('ul', { className: 'site-nav__links' }, NAV_LINKS.map(({ href, label }) => {
        const link = el('a', { href, text: label });
        if (isCurrent(href)) link.setAttribute('aria-current', 'page');
        return el('li', {}, link);
      })),
    ]),
    el('div', { className: 'site-nav__user' }, [
      loginArea,
      el('button', {
        type: 'button', className: 'site-nav__icon', 'aria-label': '장바구니', text: '🛒', onClick: handleCartClick,
      }),
    ]),
  ]);

  async function handleLogout() {
    await signOut();
    window.location.href = './index.html';
  }

  // 로그인 상태가 바뀔 때마다 로그인 영역을 다시 그린다
  // (나중에 '로그인' 글자를 사람 아이콘으로 바꿀 예정)
  async function renderUser(user) {
    if (!user) {
      loginArea.replaceChildren(el('a', { href: './login.html', text: '로그인' }));
      return;
    }
    const nickname = await getMyNickname(user.id).catch(() => '');
    loginArea.replaceChildren(
      el('span', { className: 'site-nav__name', text: `${nickname || '회원'}님` }),
      el('button', { type: 'button', className: 'btn-text', text: '로그아웃', onClick: handleLogout }),
    );
  }

  // 처음 열 때도 한 번 알려주므로 따로 getCurrentUser를 부를 필요 없다
  onAuthChange(renderUser);
  return nav;
}
