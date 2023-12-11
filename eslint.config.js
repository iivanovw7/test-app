import eslintConfig from "@azat-io/eslint-config-typescript";
import eslintConfigAstro from "@azat-io/eslint-config-astro";
import typescriptEnum from "eslint-plugin-typescript-enum";
import qwik from "eslint-plugin-qwik";
import { defineFlatConfig } from "eslint-define-config";
import tailwindcss from "eslint-plugin-tailwindcss";
import jsdoc from "eslint-plugin-jsdoc";

export default defineFlatConfig([
    ...eslintConfig,
    ...eslintConfigAstro,
    {
        rules: {
            "arrow-body-style": "off",
            "unicorn/filename-case": [
                "error",
                {
                    cases: { pascalCase: true, camelCase: true },
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
        plugins: {
            tailwindcss,
        },
    },
    {
        rules: {
            "@typescript-eslint/no-redeclare": "off",
            "@typescript-eslint/consistent-type-definitions": ["error", "type"],
            "jsdoc/require-returns-description": 2,
            "jsdoc/require-description": 2,
            "jsdoc/require-returns": 2,
            "jsdoc/require-jsdoc": 2,
            "qwik/use-method-usage": "error",
            "qwik/valid-lexical-scope": "error",
            "qwik/no-react-props": "error",
            "qwik/prefer-classlist": "warn",
            "qwik/jsx-no-script-url": "warn",
            "qwik/loader-location": "warn",
            "qwik/jsx-key": "warn",
            "qwik/unused-server": "error",
            "qwik/jsx-img": "warn",
            "qwik/jsx-a": "warn",
            "qwik/no-use-visible-task": "warn",
        },
        plugins: {
            "typescript-enum": typescriptEnum,
            jsdoc,
            qwik,
        },
        files: ["*.ts", "tsx"],
    },
    {
        ignores: ["eslint.config.cjs"],
    },
]);
