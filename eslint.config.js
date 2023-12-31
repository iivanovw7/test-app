import perfectionistAlphabetical from "eslint-plugin-perfectionist/configs/recommended-alphabetical";
import eslintConfig from "@azat-io/eslint-config-typescript";
import eslintConfigAstro from "@azat-io/eslint-config-astro";
import typescriptEnum from "eslint-plugin-typescript-enum";
import { defineFlatConfig } from "eslint-define-config";
import { FlatCompat } from "@eslint/eslintrc";
import jsdoc from "eslint-plugin-jsdoc";

const compat = new FlatCompat();

export default defineFlatConfig([
    ...eslintConfig,
    ...eslintConfigAstro,
    perfectionistAlphabetical,
    ...compat.config({
        rules: {
            "tailwindcss/no-custom-classname": [
                "error",
                {
                    whitelist: ["brand\\-.*"],
                    skipClassAttribute: true,
                },
            ],
            "unicorn/prevent-abbreviations": [
                "error",
                {
                    ignore: ["env", "Env"],
                },
            ],
            "tailwindcss/classnames-order": [
                "error",
                {
                    officialSorting: true,
                },
            ],
        },
        extends: ["plugin:tailwindcss/recommended"],
    }),
    {
        rules: {
            "unicorn/filename-case": [
                "error",
                {
                    cases: { kebabCase: true },
                },
            ],
            "arrow-body-style": "off",
        },
    },
    {
        rules: {
            "@typescript-eslint/consistent-type-definitions": ["error", "type"],
            "@typescript-eslint/no-redeclare": "off",
            "jsdoc/require-returns-description": 2,
            "jsdoc/require-description": 2,
            "jsdoc/require-returns": 2,
            "jsdoc/require-jsdoc": 2,
        },
        plugins: {
            "typescript-enum": typescriptEnum,
            jsdoc,
        },
        files: ["**/*.ts", "**/*.tsx"],
    },
    {
        ignores: ["eslint.config.cjs", "public/*"],
    },
]);
