// 준비 중 페이지 공통 시작점 (products·routine·guides·brand가 같이 쓴다)
import './styles/variables.css';
import './styles/base.css';
import './styles/nav.css';
import './styles/form.css';
import { PageLayout } from './components/PageLayout.js';
import { ComingSoon } from './components/ComingSoon.js';

PageLayout(ComingSoon());
