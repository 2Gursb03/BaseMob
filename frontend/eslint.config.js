// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    // TypeScript 경로(@/)와 SVG 파일을 인식하기 위한 설정
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
      },
    },
    rules: {
      // SVG 파일 임포트 시 발생하는 unresolved 에러를 무시합니다
      'import/no-unresolved': ['error', { ignore: ['\\.svg$'] }],
    },
  },
]);