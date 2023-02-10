// eslint-disable-next-line @typescript-eslint/no-var-requires
const { readGitignoreFiles } = require('eslint-gitignore');

module.exports = {
    ignorePatterns: [...readGitignoreFiles({ cwd: __dirname })],
    env: {
        browser: true,
        es2021: true,
    },
    plugins: ['@typescript-eslint', 'prettier'],
    extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        '@typescript-eslint/no-unused-vars': 'error',
        '@typescript-eslint/no-explicit-any': 'error',
    },
};
