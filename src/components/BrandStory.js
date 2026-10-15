// ⑦ 브랜드 이야기 — 핵심 소개는 히어로에서 했으니, 여기서는 Founder's Note 요약과
// 더 읽고 싶은 사람을 위한 자세한 이야기(우리 브랜드 페이지·유튜브) 연결만 둔다
// ⚠ 공식몰(cecith.kr)로는 연결하지 않는다
import { el } from '../lib/dom.js';
import { BRAND } from '../lib/mainContent.js';
import { ExternalLink, PageLink, Section, SiteImage } from './SectionParts.js';

// 사이트 안 페이지는 같은 탭, 유튜브만 새 탭
function BrandLink([text, href]) {
  const link = href.startsWith('./') ? PageLink({ href, text }) : ExternalLink({ href, text });
  return el('li', {}, link);
}

export function BrandStory() {
  return Section({
    id: 'brand-title',
    className: 'brand',
    header: { label: 'Founder’s Note', title: '브랜드 이야기' },
    children: [
      el('div', { className: 'brand-layout' }, [
        SiteImage({ file: 'brand-story.png', alt: '세시드 브랜드 무드 이미지', width: 1500, height: 1000 }),
        el('div', { className: 'brand-layout__text' }, [
          // 원본 Founder's Note의 한 문장 인용 (출처 표기)
          el('blockquote', { className: 'brand__quote' }, [
            el('p', { text: `“${BRAND.quote}”` }),
            el('footer', { text: '— 세시드 Founder’s Note' }),
          ]),
          el('p', { className: 'brand__summary', text: BRAND.summary }),
          el('ul', { className: 'brand__links' }, BRAND.links.map(BrandLink)),
        ]),
      ]),
    ],
  });
}
