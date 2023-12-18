/* eslint-disable unicorn/prefer-module */

const colors = require("tailwindcss/colors");

module.exports = {
    theme: {
        extend: {
            colors: {
                brand: {
                    dark: {
                        "hover-tertiary": colors.gray[800],
                        "focus-ring": colors.blue[800],
                        background: colors.stone[900],
                        primary: colors.blue[700],
                        outline: colors.gray[100],
                        tertiary: "transparent",
                        hover: colors.gray[800],
                        text: colors.gray[100],
                    },
                    "hover-tertiary": colors.gray[300],
                    "focus-ring": colors.blue[300],
                    background: colors.stone[200],
                    warning: colors.orange[500],
                    success: colors.green[500],
                    primary: colors.blue[600],
                    outline: colors.gray[600],
                    tertiary: "transparent",
                    hover: colors.gray[300],
                    error: colors.red[500],
                    text: colors.gray[800],
                },
            },
            spacing: {
                footer: "100px",
                header: "100px",
            },
            fontFamily: {
                sans: ["Inconsolata", "sans-serif"],
            },
        },
    },
    plugins: [
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/typography"),
        require("postcss-import"),
        require("postcss-100vh-fix"),
        require("autoprefixer"),
        require("flowbite/plugin"),
    ],
    content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}", "./node_modules/flowbite/**/*.js"],
    darkMode: "class",
    safelist: [],
};
