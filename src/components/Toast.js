// 토스트 메시지 — 화면 위쪽 가운데에 잠깐 나타났다 사라지는 알림
// 페이지마다 한 개의 상자를 만들어 두고, 새 메시지가 오면 내용만 바꾼다
import { el } from '../lib/dom.js';

const SHOW_MS = 3000; // 3초 동안 보여준다
let box = null;
let hideTimer = null;

// 처음 호출될 때 한 번만 상자를 만든다
// role="alert": 화면낭독기가 메시지를 바로 읽어준다
function getBox() {
  if (!box) {
    box = el('div', { className: 'toast', role: 'alert', 'aria-live': 'assertive' });
    document.body.append(box);
  }
  return box;
}

// type: 'error'(실패) 또는 'info'(안내)
export function showToast(message, type = 'error') {
  const toast = getBox();
  toast.textContent = message;
  toast.dataset.type = type;
  toast.classList.add('toast--show');

  // 연달아 호출되면 이전 타이머를 지우고 다시 3초를 센다
  clearTimeout(hideTimer);
  hideTimer = setTimeout(() => toast.classList.remove('toast--show'), SHOW_MS);
}
