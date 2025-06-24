
document.addEventListener('DOMContentLoaded', () => {
    const musicInput = document.getElementById('musicInput');
    const imageInput = document.getElementById('imageInput');
    const addBtn = document.getElementById('addBtn');
    const musicList = document.getElementById('musicList');
    let editIndex = null;
    const loadMusics = () => {
        const musics = JSON.parse(localStorage.getItem('musics')) || [];
        musicList.innerHTML = '';
        musics.forEach((item, index) => {
            addMusicToDOM(item, index);
        });
    };

    const saveMusics = (musics) => {
        localStorage.setItem('musics', JSON.stringify(musics));
    };

    const addMusicToDOM = (item, index) => {
        const li = document.createElement('li');
    
        if (item.image && item.image.trim() !== '') {
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = 'Imagem da música';
            li.appendChild(img);
        }
    
        const text = document.createTextNode(item.name);
        li.appendChild(text);
    
        // Botão Editar (✎)
        const editBtn = document.createElement('span');
        editBtn.textContent = '✎';
        editBtn.classList.add('remove'); // usa o estilo existente
        editBtn.style.color = 'orange';  // cor diferente
        editBtn.style.right = '35px';    // reposiciona à esquerda do "remover"
        editBtn.addEventListener('click', () => {
            musicInput.value = item.name;
            imageInput.value = item.image;
            editIndex = index;
            addBtn.textContent = 'Salvar Edição';
        });
        li.appendChild(editBtn);
    
        // Botão Remover (✖)
        const removeBtn = document.createElement('span');
        removeBtn.textContent = '✖';
        removeBtn.classList.add('remove');
        removeBtn.addEventListener('click', () => {
            removeMusic(index);
        });
    
        li.appendChild(removeBtn);
        musicList.appendChild(li);
    };

    const addMusic = () => {
        const name = musicInput.value.trim();
        const image = imageInput.value.trim();
    
        if (name === '') return;
    
        const musics = JSON.parse(localStorage.getItem('musics')) || [];
    
        if (editIndex !== null) {
            musics[editIndex] = { name, image };
            editIndex = null;
            addBtn.textContent = 'Adicionar';
        } else {
            musics.push({ name, image });
        }
    
        saveMusics(musics);
        loadMusics();
    
        musicInput.value = '';
        imageInput.value = '';
    };
    

    const removeMusic = (index) => {
        const musics = JSON.parse(localStorage.getItem('musics')) || [];
        musics.splice(index, 1);
        saveMusics(musics);
        loadMusics();
    };

    addBtn.addEventListener('click', addMusic);
    musicInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addMusic();
    });

    loadMusics();
});
  