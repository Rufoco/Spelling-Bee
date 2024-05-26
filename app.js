document.getElementById('admin-button').addEventListener('click', () => {
    window.location.href = 'admin.html';
});

const listDropdown = document.getElementById('list-dropdown');
const currentWordElement = document.getElementById('current-word');
const nextWordButton = document.getElementById('next-word-button');
const restartButton = document.getElementById('restart-button');
const messageElement = document.getElementById('message');

let words = [];
let currentIndex = 0;

// Función para ajustar el tamaño de la fuente
function adjustFontSize() {
    let fontSize = 7; // Empezar con el tamaño de fuente grande
    currentWordElement.style.fontSize = fontSize + 'em';

    // Reducir el tamaño de la fuente hasta que la palabra quepa en una sola línea
    while (currentWordElement.scrollWidth > currentWordElement.clientWidth && fontSize > 1) {
        fontSize -= 0.1;
        currentWordElement.style.fontSize = fontSize + 'em';
    }
}

// Función para cargar las palabras de la lista seleccionada
function loadWords(list) {
    // Aquí deberías cargar las palabras de la lista seleccionada
    // Por ejemplo, podrías tener un objeto con listas predefinidas
    const wordLists = {
        lista1: ["palabra1", "palabra2", "palabra3"],
        lista2: ["supercalifragilisticoespialidoso", "anticonstitucionalmente", "electroencefalografista"]
    };

    words = wordLists[list] || [];
    currentIndex = 0;
    if (words.length > 0) {
        currentWordElement.textContent = words[currentIndex];
        adjustFontSize();
        messageElement.style.display = 'none';
        nextWordButton.style.display = 'inline-block';
        restartButton.style.display = 'none';
    } else {
        currentWordElement.textContent = '-';
        messageElement.style.display = 'block';
        nextWordButton.style.display = 'none';
        restartButton.style.display = 'none';
    }
}

// Evento para manejar el cambio de la lista seleccionada
listDropdown.addEventListener('change', (event) => {
    const selectedList = event.target.value;
    loadWords(selectedList);
});

// Evento para manejar el botón de siguiente palabra
nextWordButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex < words.length) {
        currentWordElement.textContent = words[currentIndex];
        adjustFontSize();
    } else {
        messageElement.style.display = 'block';
        nextWordButton.style.display = 'none';
        restartButton.style.display = 'inline-block';
    }
});

// Evento para manejar el botón de reiniciar
restartButton.addEventListener('click', () => {
    currentIndex = 0;
    currentWordElement.textContent = words[currentIndex];
    adjustFontSize();
    messageElement.style.display = 'none';
    nextWordButton.style.display = 'inline-block';
    restartButton.style.display = 'none';
});

// Inicializar el dropdown con listas de ejemplo
function initializeDropdown() {
    const lists = ["lista1", "lista2"];
    lists.forEach(list => {
        const option = document.createElement('option');
        option.value = list;
        option.textContent = list;
        listDropdown.appendChild(option);
    });
}

// Llamar a la función de inicialización al cargar la página
window.onload = () => {
    initializeDropdown();
    adjustFontSize();
};
