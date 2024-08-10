import globals from 'globals';
import tsEslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';
import eslintJs from '@eslint/js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default [
    {
        files: ['src/**/*.ts', 'src/**/*.js'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                EventListener: 'readonly'
            },
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: __dirname,
            }
        },
        linterOptions: {
            noInlineConfig: true,
            reportUnusedDisableDirectives: 'error'
        },
        rules: {
            ...eslintJs.configs.recommended.rules,
            'no-unused-vars': 'off',
            ...tsEslint.configs.recommended.rules
        }
    }
];
