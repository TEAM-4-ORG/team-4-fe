module.exports = {
  presets: [
    '@babel/preset-env',
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript', // TypeScript 코드 처리를 위한 프리셋 추가
  ],
};