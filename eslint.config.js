import eslintConfig from "@azat-io/eslint-config-typescript";
import eslintConfigAstro from "@azat-io/eslint-config-astro";
import typescriptEnum from "eslint-plugin-typescript-enum";
import { defineFlatConfig } from "eslint-define-config";
import tailwindcss from "eslint-plugin-tailwindcss";
import jsdoc from "eslint-plugin-jsdoc";
import qwik from "eslint-plugin-qwik";

export default defineFlatConfig([
    ...eslintConfig,
    ...eslintConfigAstro,
    {
        rules: {
            ...tailwindcss.recommended,
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
            "unicorn/filename-case": [
                "error",
                {
                    cases: { kebabCase: true },
                },
            ],
            "arrow-body-style": "off",
        },
        plugins: {
            tailwindcss,
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
            ...qwik.recommended,
        },
        plugins: {
            "typescript-enum": typescriptEnum,
            jsdoc,
            qwik,
        },
        files: ["**/*.ts", "**/*.tsx"],
    },
    {
        ignores: ["eslint.config.cjs", "public/*"],
    },
]);
