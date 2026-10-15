// 메인 페이지 본문에 들어가는 정보 — 모두 공식몰(cecith.kr)에서 2026-10-15에 확인한 내용
// 원본 문단을 그대로 옮기지 않고, 확인된 사실만 짧게 요약했다 (CLAUDE.md 표현 규칙)
// 확인되지 않은 내용(사용 순서 세부, 첫구매 조건 등)은 만들지 않는다
// ⚠ 공식몰(cecith.kr)로 가는 링크는 절대 넣지 않는다 (브랜드 허락 없음) → 모든 버튼은 우리 사이트 안의 페이지로
import { PROMO_PRODUCT } from '../components/PromoBar.js';

// 제품 버튼은 우리 제품 페이지(products.html)의 해당 위치로 — 내용은 제품 페이지를 만들며 채운다
export const productPage = (id) => `./products.html#${id}`;

// ② 대표 제품 — 역할·용량·가격 비교 (가격은 판매가)
export const PRODUCTS = [
  {
    id: 'serum',
    name: '워터락 퍼스트 세럼',
    volume: '150ml',
    price: '33,000원',
    role: '보습 세럼 · 세안 후 루틴의 첫 단계',
    image: 'product-waterlock-serum-150.png',
    url: productPage('serum'),
  },
  {
    id: 'sun',
    name: '워터핏 미네랄 무기자차 장벽 선세럼',
    volume: '50ml',
    price: '35,000원',
    role: '선세럼 · 매일 쓰는 자외선 차단 (SPF50+ · PA++++)',
    image: 'product-waterfit-sun-serum-50.png',
    url: productPage('sun'),
  },
];

// 미니 세럼은 별도 카드로 반복하지 않고, 보습 세럼 아래 "작은 용량" 안내로 구분한다
export const MINI = {
  ...PROMO_PRODUCT,
  url: productPage('mini'),
  volume: '30ml',
  notes: [
    '8,900원은 상품 가격이며 배송비는 별도예요.',
    '신규 가입·첫구매 한정 여부와 수량 제한은 제품 페이지에서 안내할 예정이에요.',
  ],
};

// ③ 사용 후기 — 공식몰 메인 "Real Review"(알파리뷰 위젯)에 표시된 실제 후기 중 사용감 위주로 발췌
// 별점은 상품 전체 평균만 확인됨(후기별 별점은 표시하지 않음). 작성일은 위젯 표기("n일 전") 그대로
export const REVIEW_SOURCE = {
  name: '공식몰 리뷰 (알파리뷰)',
  checkedAt: '2026-10-15',
  allUrl: productPage('reviews'), // 전체 후기는 제품 페이지에 모은다
};

export const REVIEW_STATS = [
  { product: '워터락 퍼스트 세럼', rating: '4.9', count: '2,649' },
  { product: '워터핏 미네랄 선세럼', rating: '4.7', count: '833' },
];

export const REVIEWS = [
  {
    product: '워터락 퍼스트 세럼 30ml',
    text: '어제받아서 오늘 사용해봣는데 끈적임 덜하고 발림성이 부드러워요',
    excerpt: 'start', // 긴 후기의 첫 문장만 발췌 (원문 표기 그대로)
    author: '박**',
    written: '1일 전 작성',
    verified: true,
  },
  {
    product: '워터락 퍼스트 세럼 30ml',
    text: '가볍지만 수분감이 오래 유지되어 만족스러워요.',
    excerpt: 'middle', // 긴 후기 가운데 문장 발췌 (앞뒤 생략)
    author: '이**',
    written: '1일 전 작성',
    verified: true,
  },
  {
    product: '워터핏 미네랄 선세럼 50ml',
    text: '백탁이 없고 자연스럽게 발리면서 흡수가 되는것 같아서 좋아요',
    excerpt: null, // 전문
    author: '김**',
    written: '2일 전 작성',
    verified: true,
  },
  {
    product: '워터핏 미네랄 선세럼 50ml',
    text: '발림성도 부드럽고 맘에들어요',
    excerpt: null, // 전문
    author: 'LI **',
    written: '1일 전 작성',
    verified: true,
  },
];

// ④ 제품을 선택할 근거 — 상품 페이지 설명에서 확인된 성분·제형·특징만 (효과 보장 표현 제외)
export const REASONS = [
  {
    productId: 'serum',
    title: '워터락 퍼스트 세럼',
    points: [
      ['주요 성분', '10중 히알루론산, 호호바, 스쿠알란, 미네랄, 아쿠아포린'],
      ['쓰임', '유수분 밸런스를 위한 퍼스트 세럼 — 루틴의 첫 단계'],
      ['용량', '150ml · 미니 30ml'],
    ],
  },
  {
    productId: 'sun',
    title: '워터핏 미네랄 무기자차 장벽 선세럼',
    points: [
      ['자외선 차단', '무기자차 필터 2종(징크옥사이드 · 티타늄디옥사이드), SPF50+ · PA++++'],
      ['주요 성분', '아줄렌, 세라마이드, 디판테놀, BARRIE-BIO(프로바이오틱스)'],
      ['기능성', '미백 · 주름개선 이중기능성'],
      ['세정', '일반 클렌저로 지울 수 있는 무기자차'],
    ],
  },
];

// ⑤ 아침·저녁 루틴 — 공식 설명으로 확인된 단계만 (그 밖의 순서는 만들지 않음)
export const ROUTINES = [
  {
    time: '아침',
    steps: [
      { label: '세안 후 첫 단계', productId: 'serum' },
      { label: '매일 자외선 차단', productId: 'sun' },
    ],
  },
  {
    time: '저녁',
    steps: [{ label: '세안 후 첫 단계', productId: 'serum' }],
  },
];

// ⑥ 가이드·FAQ — 고객 질문 기준. 자세한 내용은 우리 제품·가이드 페이지로 이어 준다
export const GUIDE_POST = {
  title: '피부 속부터 맑게 차오르는 시원함',
  summary: '더운 날 워터락 퍼스트 세럼으로 수분을 채우는 루틴을 소개하는 공식 가이드 글',
  url: './guides.html', // 우리 가이드 페이지
};

export const FAQS = [
  {
    q: '어떤 순서로 사용하나요?',
    a: '워터락 퍼스트 세럼은 세안 후 첫 단계에, 워터핏 선세럼은 매일 자외선 차단 단계에 사용해요. 자세한 사용 방법은 제품 페이지에서 확인할 수 있어요.',
    links: [['워터락 퍼스트 세럼', productPage('serum')], ['워터핏 선세럼', productPage('sun')]],
  },
  {
    q: '전성분은 어디서 보나요?',
    a: '제품별 전체 성분은 제품 페이지에 정리할 예정이에요.',
    links: [['워터락 퍼스트 세럼 전성분', productPage('serum')], ['워터핏 선세럼 전성분', productPage('sun')]],
  },
  {
    q: '미니 세럼(첫구매특가)은 어떤 조건인가요?',
    a: '워터락 퍼스트 세럼 30ml의 판매가는 8,900원(소비자가 15,000원)이에요. 신규 가입·첫구매 한정 여부와 수량 제한은 제품 페이지에서 안내할 예정이에요.',
    links: [['미니 세럼 상품 페이지', productPage('mini')]],
  },
  {
    q: '배송비는 얼마인가요?',
    a: '배송비는 3,000원이고, 50,000원 이상 구매하면 무료예요. 도서산간 지역은 추가 배송비가 생길 수 있어요.',
    links: [],
  },
];

// ⑦ 브랜드 이야기 — Founder's Note 요약 + 자세히 읽을 곳
export const BRAND = {
  quote: '화려한 변화보다, 꾸준한 루틴이 더 큰 힘을 만듭니다.',
  summary: '피부를 위한 루틴도 거창할 필요 없이, 작은 습관을 매일 이어가는 것에서 시작한다는 이야기예요. 세시드는 그 루틴을 함께 설계하는 브랜드를 지향해요.',
  links: [
    ['브랜드 이야기 자세히 보기', './brand.html'],
    ['약사 루틴 팁 & 브랜드 에세이 (YouTube)', 'https://www.youtube.com/@ceci_yaksa/shorts'],
  ],
};
