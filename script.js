const togglebutton = document.getElementById("theme-toggle");

togglebutton.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        togglebutton.textContent = "☀️";
    } else {
        togglebutton.textContent = "🌙";
    }
});