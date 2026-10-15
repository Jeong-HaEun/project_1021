// ⑤ 아침·저녁 루틴 — 설문(진단)을 거치지 않아도 사용 단계와 제품을 바로 볼 수 있게
// 공식 설명으로 확인된 단계만 표시하고, 나에게 맞춘 루틴은 진단 페이지로 이어 준다
import { el } from '../lib/dom.js';
import { PRODUCTS, ROUTINES } from '../lib/mainContent.js';
import { PageLink, Section, SiteImage } from './SectionParts.js';

const findProduct = (id) => PRODUCTS.find((p) => p.id === id);

const IMAGES = {
  아침: { file: 'routine-morning.png', alt: '아침 루틴 단계를 표현한 이미지' },
  저녁: { file: 'routine-evening.png', alt: '저녁 루틴 단계를 표현한 이미지' },
};

function RoutineCard({ time, steps }) {
  return el('li', { className: 'routine-card' }, [
    SiteImage({ ...IMAGES[time], width: 1200, height: 1200 }),
    el('h3', { className: 'routine-card__time', text: time }),
    el('ol', { className: 'routine-card__steps' }, steps.map(({ label, productId }) => {
      const product = findProduct(productId);
      return el('li', {}, [
        el('span', { className: 'routine-card__label', text: label }),
        PageLink({ href: product.url, text: product.name }),
      ]);
    })),
  ]);
}

export function DailyRoutine() {
  return Section({
    id: 'routine-title',
    className: 'routine',
    header: { label: 'Routine Guide', title: '아침·저녁 루틴', desc: '어느 단계에 어떤 제품을 쓰는지 바로 확인하세요.' },
    children: [
      el('ul', { className: 'routine-grid' }, ROUTINES.map(RoutineCard)),
      el('p', { className: 'section__more' }, [
        '내 피부에 맞춘 루틴이 궁금하다면 ',
        el('a', { className: 'text-link', href: './routine.html', text: '루틴 진단 (준비 중)' }),
      ]),
    ],
  });
}
