import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        files: [
            'src/**/*.js',
            'src/**/*.cjs',
            'src/**/*.mjs'
        ],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module'
        },
        linterOptions: {
            noInlineConfig: true
        },
        rules: {
            'no-unused-vars': 'error'
        }
    }
];