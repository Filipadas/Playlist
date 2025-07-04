
document.addEventListener('DOMContentLoaded', () => {//primeiro ouvinte de evento-quando o DOM for carregado
    const musicInput = document.getElementById('musicInput');
    const imageInput = document.getElementById('imageInput');
    const addBtn = document.getElementById('addBtn');
    const musicList = document.getElementById('musicList');
    let editIndex = null;
    const loadMusics = () => {
        const musics = JSON.parse(localStorage.getItem('musics')) || [];//primeiro armazenamento local-carrega as músicas salvas no armazenamento local
        musicList.innerHTML = '';
        musics.forEach((item, index) => {
            addMusicToDOM(item, index);
        });
    };

    const saveMusics = (musics) => {
        localStorage.setItem('musics', JSON.stringify(musics));//segundo armazenamento local-armazena as músicas
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
        editBtn.addEventListener('click', () => {//segundo ouvinte de evento-quando o botão de editar uma música for clicado, vai reabrir os inputs e "excluir" aquela música temporariamente
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
        removeBtn.addEventListener('click', () => {//terceiro ouvinte de evento-quando o botão de remover for clicado(x) a música será excluída através da função removeMusic
            removeMusic(index);
        });
    
        li.appendChild(removeBtn);
        musicList.appendChild(li);
    };

    const addMusic = () => {
        const name = musicInput.value.trim();
        const image = imageInput.value.trim();
    
        if (name === '') return;
    
        const musics = JSON.parse(localStorage.getItem('musics')) || [];//terceiro armazenamento local-analisa se a playlist está vazia
    
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
        const musics = JSON.parse(localStorage.getItem('musics')) || [];//quarto armazenamento local-remove a música do local storage
        musics.splice(index, 1);
        saveMusics(musics);
        loadMusics();
    };

    addBtn.addEventListener('click', addMusic);//quarto ouvinte de evento-quando o botão de adicionar for clicado, executa a função addMusic
    musicInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addMusic();
    });

    loadMusics();
});
  