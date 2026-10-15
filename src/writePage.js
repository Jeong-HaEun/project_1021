// 글쓰기 페이지 시작점
import './styles/variables.css';
import './styles/base.css';
import './styles/nav.css';
import './styles/form.css';
import './styles/board.css';
import { PageLayout } from './components/PageLayout.js';
import { WritePost } from './components/WritePost.js';

PageLayout(WritePost());
