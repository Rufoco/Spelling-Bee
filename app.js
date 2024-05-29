document.addEventListener('DOMContentLoaded', () => {
    const adminButton = document.getElementById('admin-button');
    const listDropdown = document.getElementById('list-dropdown');
    const currentWordElement = document.getElementById('current-word');
    const nextWordButton = document.getElementById('next-word-button');
    const restartButton = document.getElementById('restart-button');
    const messageElement = document.getElementById('message');
    const timerButton = document.getElementById('timer-button');
    const penultimateMessageElement = document.getElementById('penultimate-message');

    let words = [];
    let currentIndex = 0;
    let timerInterval;

    adminButton.addEventListener('click', () => {
        window.location.href = 'admin.html';
    });

    listDropdown.addEventListener('change', loadWords);
    nextWordButton.addEventListener('click', showNextWord);
    restartButton.addEventListener('click', restartWords);
    timerButton.addEventListener('click', startTimer);

    function adjustFontSize() {
        currentWordElement.style.fontSize = '2rem';
        while (currentWordElement.scrollWidth > currentWordElement.clientWidth) {
            const currentFontSize = parseFloat(window.getComputedStyle(currentWordElement, null).getPropertyValue('font-size'));
            currentWordElement.style.fontSize = (currentFontSize - 1) + 'px';
        }
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function loadWords() {
        const selectedList = listDropdown.value;
        words = JSON.parse(localStorage.getItem('lists'))[selectedList] || [];
        shuffle(words);
        currentIndex = 0;
        showNextWord();
    }

    function showNextWord() {
        if (currentIndex < words.length) {
            currentWordElement.textContent = words[currentIndex];
            adjustFontSize();
            currentIndex++;
            if (currentIndex === words.length - 1) {
                penultimateMessageElement.style.display = 'block';
            } else {
                penultimateMessageElement.style.display = 'none';
            }
        } else {
            messageElement.textContent = '¡Has llegado al final de la lista!';
            nextWordButton.disabled = true;
        }
    }

    function restartWords() {
        currentIndex = 0;
        messageElement.textContent = '';
        nextWordButton.disabled = false;
        penultimateMessageElement.style.display = 'none';
        showNextWord();
    }

    function startTimer() {
        clearInterval(timerInterval);
        let timeLeft = 30;
        timerButton.textContent = timeLeft;
        timerInterval = setInterval(() => {
            timeLeft--;
            timerButton.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerButton.textContent = '30';
            }
        }, 1000);
    }

    function initializeDropdown() {
        const lists = JSON.parse(localStorage.getItem('lists')) || {};
        listDropdown.innerHTML = '<option value="" disabled selected>Seleccionar Lista</option>';
        for (const listName in lists) {
            const option = document.createElement('option');
            option.value = listName;
            option.textContent = listName;
            listDropdown.appendChild(option);
        }
    }

    initializeDropdown();
    adjustFontSize();
});
