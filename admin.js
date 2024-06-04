document.addEventListener('DOMContentLoaded', () => {
    const addWordForm = document.getElementById('add-word-form');
    const createListForm = document.getElementById('create-list-form');
    const listContainer = document.getElementById('list-container');
    const listDropdown = document.getElementById('list-dropdown');
    const wordsSection = document.getElementById('words-section');
    const wordsContainer = document.getElementById('words-container');

    let lists = JSON.parse(localStorage.getItem('lists')) || {};

    function saveLists() {
        const encodedLists = {};
        for (let key in lists) {
            encodedLists[encodeURIComponent(key)] = lists[key];
        }
        localStorage.setItem('lists', JSON.stringify(encodedLists));
    }

    function renderLists() {
        listContainer.innerHTML = '';
        listDropdown.innerHTML = '<option value="" disabled selected>Seleccionar Lista</option>';
        for (const listName in lists) {
            const encodedListName = encodeURIComponent(listName);
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span>${listName}</span>
                <button class="view-words-button" data-list="${encodedListName}">Ver Palabras</button>
                <button class="delete-list-button" data-list="${encodedListName}">Eliminar Lista</button>
            `;
            listContainer.appendChild(listItem);

            const option = document.createElement('option');
            option.value = encodedListName;
            option.textContent = listName;
            listDropdown.appendChild(option);
        }
    }

    function renderWords(encodedListName) {
        const listName = decodeURIComponent(encodedListName);
        wordsContainer.innerHTML = '';
        if (lists[listName] && lists[listName].length > 0) {
            lists[listName].forEach(word => {
                const wordItem = document.createElement('li');
                wordItem.textContent = word;
                wordsContainer.appendChild(wordItem);
            });
        } else {
            wordsContainer.innerHTML = '<li>No hay palabras en esta lista.</li>';
        }
        wordsSection.style.display = 'block';
    }

    addWordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newWord = document.getElementById('new-word').value.trim();
        const encodedListName = listDropdown.value;
        const listName = decodeURIComponent(encodedListName);
        if (newWord && listName) {
            lists[listName].push(newWord);
            saveLists();
            document.getElementById('new-word').value = '';
            renderWords(encodedListName);
        }
    });

    createListForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newList = document.getElementById('new-list').value.trim();
        if (newList && !lists[newList]) {
            lists[newList] = [];
            saveLists();
            renderLists();
            document.getElementById('new-list').value = '';
        }
    });

    listContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-list-button')) {
            const encodedListName = e.target.getAttribute('data-list');
            const listName = decodeURIComponent(encodedListName);
            delete lists[listName];
            saveLists();
            renderLists();
            wordsSection.style.display = 'none';
        } else if (e.target.classList.contains('view-words-button')) {
            const encodedListName = e.target.getAttribute('data-list');
            renderWords(encodedListName);
        }
    });

    renderLists();
});
