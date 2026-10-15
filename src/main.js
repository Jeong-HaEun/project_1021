// 앱 시작점(메인 페이지): 스타일을 불러오고 공통 틀에 섹션을 붙인다
import './styles/variables.css';
import './styles/base.css';
import './styles/nav.css';
import { PageLayout } from './components/PageLayout.js';

// 섹션은 이후 한 번에 하나씩 추가한다
PageLayout();
