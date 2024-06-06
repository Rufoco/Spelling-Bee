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
    let isTimerRunning = false;
    let timeLeft = 30;

    adminButton.addEventListener('click', () => {
        window.location.href = 'admin.html';
    });

    listDropdown.addEventListener('change', loadWords);
    nextWordButton.addEventListener('click', () => {
        showNextWord();
        resetTimer();
    });
    restartButton.addEventListener('click', restartWords);
    timerButton.addEventListener('click', toggleTimer);

    function adjustFontSize() {
        currentWordElement.style.fontSize = '10rem'; // Tamaño inicial grande para empezar
        let attempts = 0;
        const maxAttempts = 100; // Limitar el número de intentos para evitar bucles infinitos
        while (currentWordElement.scrollWidth > currentWordElement.clientWidth && attempts < maxAttempts) {
            const currentFontSize = parseFloat(window.getComputedStyle(currentWordElement, null).getPropertyValue('font-size'));
            currentWordElement.style.fontSize = (currentFontSize - 1) + 'px';
            attempts++;
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
        console.log('Selected List:', selectedList); // Depurar qué lista se selecciona
        const lists = loadLists();
        console.log('Lists in localStorage:', lists); // Depurar qué hay en localStorage
        words = lists[selectedList] || [];
        console.log('Words loaded:', words); // Depurar las palabras cargadas
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
        shuffle(words); // Barajar las palabras nuevamente
        currentIndex = 0;
        messageElement.textContent = '';
        nextWordButton.disabled = false;
        penultimateMessageElement.style.display = 'none';
        showNextWord();
        resetTimer();
    }

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                timerButton.textContent = timeLeft;
                updateTimerColor();
            } else {
                clearInterval(timerInterval);
                timerButton.textContent = '0';
                timerButton.style.backgroundColor = 'red'; // Color final
            }
        }, 1000);
    }

    function toggleTimer() {
        if (isTimerRunning) {
            clearInterval(timerInterval);
        } else {
            startTimer();
        }
        isTimerRunning = !isTimerRunning;
    }

    function resetTimer() {
        clearInterval(timerInterval);
        timeLeft = 30;
        timerButton.textContent = timeLeft;
        timerButton.style.backgroundColor = '#4CAF50'; // Color inicial
        isTimerRunning = false;
    }

    function updateTimerColor() {
        if (timeLeft > 20) {
            timerButton.style.backgroundColor = '#4CAF50'; // Verde
        } else if (timeLeft > 10) {
            timerButton.style.backgroundColor = '#FFA500'; // Naranja
        } else {
            timerButton.style.backgroundColor = 'red'; // Rojo
        }
    }

    function initializeDropdown() {
        const lists = loadLists();
        listDropdown.innerHTML = '<option value="" disabled selected>Seleccionar Lista</option>';
        for (const listName in lists) {
            const option = document.createElement('option');
            option.value = listName;
            option.textContent = listName;
            listDropdown.appendChild(option);
        }
    }

    function loadLists() {
        return JSON.parse(localStorage.getItem('lists')) || {};
    }

    initializeDropdown();
    adjustFontSize();
});
