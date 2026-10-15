// 앱 시작점(메인 페이지): 스타일을 불러오고 공통 틀에 섹션을 붙인다
// 섹션 순서 = 고객이 구매 전에 궁금해할 순서 (설계 가설, docs/decisions.md 참고)
// 어떤 브랜드인지 → 어떤 제품이 있는지 → 다른 사람의 경험 → 고를 이유 → 사용법 → 질문 → 브랜드 이야기
import './styles/variables.css';
import './styles/base.css';
import './styles/nav.css';
import './styles/form.css';
import './styles/hero.css';
import './styles/sections.css';
import './styles/sections-reviews.css';
import './styles/sections-info.css';
import { PageLayout } from './components/PageLayout.js';
import { Hero } from './components/Hero.js';
import { ProductCompare } from './components/ProductCompare.js';
import { ReviewSummary } from './components/ReviewSummary.js';
import { ProductReasons } from './components/ProductReasons.js';
import { DailyRoutine } from './components/DailyRoutine.js';
import { GuideFaq } from './components/GuideFaq.js';
import { BrandStory } from './components/BrandStory.js';

PageLayout(
  Hero(), // ① 어떤 브랜드인지
  ProductCompare(), // ② 어떤 제품이 있는지
  ReviewSummary(), // ③ 다른 사람의 경험
  ProductReasons(), // ④ 제품을 고를 근거
  DailyRoutine(), // ⑤ 아침·저녁 사용법
  GuideFaq(), // ⑥ 자주 묻는 질문
  BrandStory(), // ⑦ 자세한 브랜드 이야기
);
