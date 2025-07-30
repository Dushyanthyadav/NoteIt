const toggleButton = document.getElementById("theme-toggle");

let currentTheme = window.__resolvedTheme || "light";

function applyTheme(theme) {
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
        toggleButton.textContent = "☀️";
    } else {
        document.documentElement.classList.remove("dark");
        toggleButton.textContent = "🌙";
    }
    currentTheme = theme;
}

toggleButton.addEventListener("click", () => {
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
});

applyTheme(currentTheme);

const textarea = document.getElementById("note-text");
const storageKey = "note-text";

const savedNote = localStorage.getItem(storageKey);
if (savedNote !== null) {
    textarea.value = savedNote;
}

textarea.addEventListener("input", () => {
    localStorage.setItem(storageKey, textarea.value);
})

//Download button logic
const downloadBtn = document.getElementById("download-note");
const downloadModal = document.getElementById("download-modal");
const closeDownloadModal = document.getElementById("close-download-modal");

downloadBtn.addEventListener("click", () => {
    const text = textarea.value.trim();
    if (text === "") {
        downloadModal.classList.remove("hidden");
        return;
    }

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "note.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

closeDownloadModal.addEventListener("click", () => {
    downloadModal.classList.add("hidden");
});


//Clear text logic
const clearBtn = document.getElementById("clear-note");
const modal = document.getElementById("confirm-modal");
const confirmClear = document.getElementById("confirm-clear");
const cancelClear = document.getElementById("cancel-clear");

clearBtn.addEventListener("click", () => {
    modal.classList.remove("hidden");
});

confirmClear.addEventListener("click", () => {
    textarea.value = "";
    localStorage.removeItem(storageKey);
    modal.classList.add("hidden");
});

cancelClear.addEventListener("click", () => {
    modal.classList.add("hidden");
});

