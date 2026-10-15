// 비밀번호 재설정 페이지 시작점 (상단 메뉴 없음)
import './styles/variables.css';
import './styles/base.css';
import './styles/form.css';
import './styles/auth.css';
import './styles/toast.css';
import { BareLayout } from './components/PageLayout.js';
import { ResetForm } from './components/ResetForm.js';

BareLayout(ResetForm());
