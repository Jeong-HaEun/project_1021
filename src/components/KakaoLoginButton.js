// 카카오 로그인 버튼 — 카카오 디자인 가이드(노란 배경 + 말풍선 심볼 + "카카오 로그인")를 따른다
import { el } from '../lib/dom.js';
import { signInWithKakao } from '../lib/auth.js';
import { toKoreanError } from '../lib/validation.js';
import { showToast } from './Toast.js';

// 카카오 말풍선 심볼 (고정된 그림이라 직접 작성한 SVG를 그대로 넣는다)
const KAKAO_SYMBOL = `<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
  <path fill="currentColor" d="M12 3C6.48 3 2 6.48 2 10.8c0 2.78 1.86 5.22 4.66 6.6l-.95 3.48c-.08.3.26.54.52.37l4.15-2.74c.53.06 1.07.09 1.62.09 5.52 0 10-3.48 10-7.8S17.52 3 12 3z"/>
</svg>`;

export function KakaoLoginButton() {
  const icon = el('span', { className: 'btn-kakao__icon' });
  icon.innerHTML = KAKAO_SYMBOL;
  const button = el('button', { type: 'button', className: 'btn-kakao', onClick: handleClick }, [
    icon,
    el('span', { text: '카카오 로그인' }),
  ]);

  // 누르면 카카오 로그인 화면으로 이동 → 끝나면 Supabase를 거쳐 메인으로 돌아온다
  async function handleClick() {
    button.disabled = true;
    try {
      await signInWithKakao();
    } catch (error) {
      showToast(toKoreanError(error.message));
      button.disabled = false;
    }
  }

  return button;
}
