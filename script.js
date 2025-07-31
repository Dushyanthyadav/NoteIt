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




//timer logic
document.addEventListener("DOMContentLoaded", () => {
    const timerDisplay = document.querySelector(".timer-countdown p");
    const cancelIcon = document.getElementById("cancelIcon");
    const timerMenuItems = document.querySelectorAll(".menu-item[data-minutes]");
    const timerBox = document.querySelector(".timer_with_icon");
    const customButton = document.getElementById("Custom-timer");
    const customModal = document.getElementById("custom-timer-modal");
    const confirmTime = document.getElementById("confirm-time");
    const customInput = document.getElementById("timer-textarea");

    const timeUpModal = document.getElementById("time-up-modal");
    const closeTimeUp = document.getElementById("close-time-up");

    let timerInterval;

    function startTimer(durationInMinutes) {
        const endTime = Date.now() + durationInMinutes * 60 * 1000;
        localStorage.setItem("timerEnd", endTime);

        runTimer(endTime);
    }

    function runTimer(endTime) {
        clearInterval(timerInterval);
        timerBox.style.display = "flex";

        function update() {
            const now = Date.now();
            const remaining = Math.floor((endTime - now) / 1000);

            if (remaining <= 0) {
                clearInterval(timerInterval);
                timerDisplay.textContent = "00:00";
                timerBox.style.display = "none";
                localStorage.removeItem("timerEnd");
                timeUpModal.classList.remove("hidden");
                return;
            }

            updateDisplay(remaining);
        }

        update(); // Initial call
        timerInterval = setInterval(update, 1000);
    }

    function updateDisplay(secondsLeft) {
        const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
        const seconds = (secondsLeft % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }

    timerMenuItems.forEach(item => {
        item.addEventListener("click", () => {
            const minutes = parseInt(item.getAttribute("data-minutes"));
            if (!isNaN(minutes)) {
                startTimer(minutes);
                const timerMenu = document.getElementById("timer-menu");
                timerMenu.style.pointerEvents = "none";
                timerMenu.style.opacity = "0";

                setTimeout(() => {
                    timerMenu.style.pointerEvents = "auto";
                    timerMenu.style.opacity = "1";
                }, 500);

            }
        });
    });

    cancelIcon.addEventListener("click", () => {
        clearInterval(timerInterval);
        timerDisplay.textContent = "00:00";
        timerBox.style.display = "none";
        localStorage.removeItem("timerEnd");
    });

    customButton.addEventListener("click", () => {
        customModal.classList.remove("hidden");
    });

    confirmTime.addEventListener("click", () => {
        const customMinutes = parseInt(customInput.value.trim());

        // Validate input
        if (isNaN(customMinutes) || customMinutes <= 0) {
            customInput.style.border = "2px solid red"; // optional visual feedback
            return; // don't start timer
        }

        
        customInput.style.border = "";

        customModal.classList.add("hidden");
        startTimer(customMinutes);
    });


    closeTimeUp.addEventListener("click", () => {
        timeUpModal.classList.add("hidden");
    });

    const savedEnd = localStorage.getItem("timerEnd");
    if (savedEnd) {
        const endTime = parseInt(savedEnd);
        if (!isNaN(endTime) && endTime > Date.now()) {
            runTimer(endTime);
        } else {
            localStorage.removeItem("timerEnd");
        }
    } else {
        timerBox.style.display = "none";
    }
    
    document.getElementById("Custom-timer").addEventListener("click", () => {
    const modal = document.getElementById("custom-timer-modal");
    modal.classList.remove("hidden");
    document.getElementById("timer-textarea").focus();

   
    setTimeout(() => {
        const handleOutsideClick = (event) => {
            const modalContent = modal.querySelector(".modal-content");
            if (!modal.contains(event.target) || !modalContent.contains(event.target)) {
                modal.classList.add("hidden");
                document.removeEventListener("click", handleOutsideClick);
            }
        };

        document.addEventListener("click", handleOutsideClick);
    }, 50);
});

});

document.getElementById("about").addEventListener("click", () => {
    document.getElementById("about-modal").classList.remove("hidden");
});

document.getElementById("close-about-modal").addEventListener("click", () => {
    document.getElementById("about-modal").classList.add("hidden");
});


