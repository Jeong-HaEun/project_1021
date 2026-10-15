// ⑥ 가이드·FAQ — 고객이 구매 전에 묻는 질문 기준으로 정리 (사용법·전성분·첫구매 조건·배송비)
// 질문은 <details>로 접어 두어 길지 않게, 눌러서 펼치면 짧은 답과 확인 경로가 나온다
import { el } from '../lib/dom.js';
import { FAQS, GUIDE_POST } from '../lib/mainContent.js';
import { PageLink, Section, SiteImage } from './SectionParts.js';

function FaqItem({ q, a, links }) {
  return el('details', { className: 'faq-item' }, [
    el('summary', { text: q }),
    el('div', { className: 'faq-item__answer' }, [
      el('p', { text: a }),
      links.length > 0 && el('p', { className: 'faq-item__links' },
        links.map(([text, href]) => PageLink({ href, text }))),
    ]),
  ]);
}

function GuideCard() {
  return el('article', { className: 'guide-card' }, [
    SiteImage({ file: 'guide-01.png', alt: '피부장벽 가이드 글 대표 이미지', width: 1280, height: 720 }),
    el('div', { className: 'guide-card__body' }, [
      el('p', { className: 'guide-card__label', text: 'Barrier Guide' }),
      el('h3', { className: 'guide-card__title', text: GUIDE_POST.title }),
      el('p', { className: 'guide-card__summary', text: GUIDE_POST.summary }),
      PageLink({ href: GUIDE_POST.url, text: '가이드 읽기' }),
    ]),
  ]);
}

export function GuideFaq() {
  return Section({
    id: 'faq-title',
    className: 'faq',
    header: { label: 'Guide & FAQ', title: '자주 묻는 질문', desc: '사용법부터 배송비까지, 구매 전에 궁금한 것들이에요.' },
    children: [
      el('div', { className: 'faq-layout' }, [
        el('div', { className: 'faq-list' }, FAQS.map(FaqItem)),
        GuideCard(),
      ]),
    ],
  });
}
