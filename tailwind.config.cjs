/* eslint-disable unicorn/prefer-module */

const colors = require("tailwindcss/colors");

module.exports = {
    content: ["./src/**/*.{astro,html,js,jsx,svelte,ts,tsx,vue}", "./node_modules/flowbite/**/*.js"],
    darkMode: "class",
    plugins: [
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/typography"),
        require("postcss-import"),
        require("postcss-100vh-fix"),
        require("autoprefixer"),
        require("flowbite/plugin"),
    ],
    safelist: [],
    theme: {
        extend: {
            colors: {
                brand: {
                    background: colors.stone[200],
                    border: colors.gray[400],
                    dark: {
                        background: colors.stone[900],
                        border: colors.gray[600],
                        error: colors.red[500],
                        "focus-ring": colors.blue[800],
                        "focus-ring-error": colors.red[400],
                        hover: colors.gray[800],
                        "hover-tertiary": colors.gray[800],
                        outline: colors.gray[100],
                        primary: colors.blue[700],
                        secondary: colors.violet[500],
                        tertiary: "transparent",
                        text: colors.gray[100],
                    },
                    error: colors.red[500],
                    "focus-ring": colors.blue[300],
                    "focus-ring-error": colors.red[400],
                    hover: colors.gray[300],
                    "hover-tertiary": colors.gray[300],
                    outline: colors.gray[600],
                    primary: colors.blue[600],
                    secondary: colors.violet[700],
                    success: colors.green[500],
                    tertiary: "transparent",
                    text: colors.gray[800],
                    warning: colors.orange[500],
                },
            },
            fontFamily: {
                sans: ["Inconsolata", "sans-serif"],
            },
            spacing: {
                footer: "80px",
                header: "80px",
            },
        },
    },
};
