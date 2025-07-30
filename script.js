const togglebutton = document.getElementById("theme-toggle");

function setTheme(theme) {
    if (theme === "dark") {
        document.body.classList.add("dark");
        togglebutton.textContent = "☀️";
    } else {
        document.body.classList.remove("dark");
        togglebutton.textContent = "🌙";
    }
}

function detectAndApplyTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || savedTheme === "light") {
        setTheme(savedTheme)
    } else {

        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        setTheme(prefersDark ? "dark": "light");
    }
}

togglebutton.addEventListener("click", () => {
    const isDark = document.body.classList.contains("dark");
    const newTheme = isDark ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
});

detectAndApplyTheme();