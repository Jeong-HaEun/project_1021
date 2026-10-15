// 앱 시작점: 스타일을 불러오고 화면 조각(컴포넌트)을 #app에 붙인다
import './styles/variables.css';
import './styles/base.css';
import { ConceptNotice } from './components/ConceptNotice.js';

const app = document.querySelector('#app');

// 섹션은 이후 한 번에 하나씩 추가한다
const main = document.createElement('main');
app.append(main, ConceptNotice());
