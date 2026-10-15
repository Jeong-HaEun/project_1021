import { defineConfig } from 'vite';

// GitHub Pages는 https://<아이디>.github.io/<저장소이름>/ 주소로 열리므로
// base를 저장소 이름으로 맞춰야 CSS·JS 경로가 깨지지 않는다.
// 저장소 이름이 정해지면 아래 값을 바꾼다.
const REPO_NAME = 'project_1021';

export default defineConfig({
  base: `/${REPO_NAME}/`,
  test: {
    // 테스트 파일은 tests/ 폴더에만 둔다
    include: ['tests/**/*.test.js'],
  },
});
