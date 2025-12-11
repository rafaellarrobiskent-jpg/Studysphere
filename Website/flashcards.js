let flashcards = JSON.parse(localStorage.getItem("flashcards")) || [];

function saveFlashcards() {
    localStorage.setItem("flashcards", JSON.stringify(flashcards));
}

function generateFlashcard() {
    let term = document.getElementById("term").value.trim();
    let definition = document.getElementById("definition").value.trim();

    if (term === "" || definition === "") {
        alert("Please enter both term and definition.");
        return;
    }

    flashcards.push({ term, definition });
    saveFlashcards();
    renderFlashcards();

    document.getElementById("term").value = "";
    document.getElementById("definition").value = "";
}

function renderFlashcards() {
    let grid = document.getElementById("flashGrid");
    grid.innerHTML = "";

    flashcards.forEach((card, index) => {
        let div = document.createElement("div");
        div.className = "flash-card";
        div.innerHTML = `
            <div class="flash-inner">
                <div class="flash-front">${card.term}</div>
                <div class="flash-back">${card.definition}</div>
            </div>
            <button class="delete-btn" onclick="deleteFlashcard(${index})">
                Delete
            </button>
        `;

        div.addEventListener("click", () => {
            if (!event.target.classList.contains("delete-btn")) {
                div.classList.toggle("flipped");
            }
        });

        grid.appendChild(div);
    });
}

function deleteFlashcard(i) {
    flashcards.splice(i, 1);
    saveFlashcards();
    renderFlashcards();
}

renderFlashcards();
