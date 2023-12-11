export default {
    rules: {
        "at-rule-no-unknown": [
            true,
            {
                ignoreAtRules: ["tailwind", "apply", "include", "mixin"],
            },
        ],
        "order/properties-alphabetical-order": null,
        "no-descending-specificity": null,
        "selector-class-pattern": null,
        "max-nesting-depth": 2,
        "selector-pseudo-class-no-unknown": null,
    },
    extends: [
        "stylelint-config-standard",
        "stylelint-config-tailwindcss",
        "stylelint-config-clean-order",
        "stylelint-config-astro",
    ],
    root: true,
};
