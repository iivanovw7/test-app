(function () {
    function setTheme(theme) {
        document.documentElement.className = theme;
        localStorage.setItem("color-theme", theme);
    }

    var theme = localStorage.getItem("color-theme");

    if (
        localStorage.getItem("color-theme") === "dark" ||
        (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        setTheme(theme);
    } else {
        setTheme("light");
    }
})();

window.addEventListener("load", function () {
    var themeToggleDarkIcons = document.getElementsByClassName("theme-toggle-dark-icon");
    var themeToggleLightIcons = document.getElementsByClassName("theme-toggle-light-icon");

    var isDark = localStorage.getItem("color-theme") === "dark";

    if (!isDark) {
        for (let icon of themeToggleDarkIcons) {
            icon.classList.add("hidden");
        }

        for (let icon of themeToggleLightIcons) {
            icon.classList.remove("hidden");
        }
    } else {
        for (let icon of themeToggleLightIcons) {
            icon.classList.add("hidden");
        }

        for (let icon of themeToggleDarkIcons) {
            icon.classList.remove("hidden");
        }
    }
});
