// ② 대표 제품 비교 — 보습 세럼과 선세럼의 역할·용량·가격을 나란히 보여준다
// 미니 세럼은 같은 상품 카드를 반복하지 않고, 보습 세럼 카드 안에서 용량·판매 조건을 구분해 안내한다
// 구매·장바구니 담기는 제품 페이지와 함께 만든다(CLAUDE.md) → 여기서는 우리 제품 페이지로 "자세히 보기"만
// ⚠ 공식몰(cecith.kr)로는 연결하지 않는다
import { el } from '../lib/dom.js';
import { MINI, PRODUCTS } from '../lib/mainContent.js';
import { PageLink, Section, SiteImage } from './SectionParts.js';

function MiniNote() {
  return el('div', { className: 'product-card__mini' }, [
    el('p', { className: 'product-card__mini-title' }, [
      el('strong', { text: `작은 용량 ${MINI.volume}` }),
      ' · ',
      el('del', { text: MINI.listPrice }),
      ' → ',
      el('strong', { text: MINI.salePrice }),
    ]),
    el('ul', { className: 'product-card__mini-notes' }, MINI.notes.map((t) => el('li', { text: t }))),
    PageLink({ href: MINI.url, text: '미니 세럼 자세히 보기' }),
  ]);
}

function ProductCard(product) {
  return el('li', { className: 'product-card' }, [
    SiteImage({ file: product.image, alt: `${product.name} ${product.volume} 제품 이미지`, width: 1200, height: 1200 }),
    el('div', { className: 'product-card__body' }, [
      el('h3', { className: 'product-card__name', text: product.name }),
      el('dl', { className: 'product-card__spec' }, [
        el('dt', { text: '역할' }), el('dd', { text: product.role }),
        el('dt', { text: '용량' }), el('dd', { text: product.volume }),
        el('dt', { text: '가격' }), el('dd', { text: product.price }),
      ]),
      PageLink({ href: product.url, text: '자세히 보기', className: 'btn-outline' }),
      product.id === 'serum' && MiniNote(),
    ]),
  ]);
}

export function ProductCompare() {
  return Section({
    id: 'products-title',
    className: 'products',
    header: { label: 'Products', title: '대표 제품 비교', desc: '보습 세럼과 선세럼, 어디에 쓰는지부터 비교해 보세요.' },
    children: [el('ul', { className: 'product-compare' }, PRODUCTS.map(ProductCard))],
  });
}
