// Espera o DOM ser totalmente carregado antes de executar o código
// Isso garante que todos os elementos HTML estejam disponíveis
// para serem manipulados pelo JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona o campo de input do nome da música
    const musicInput = document.getElementById('musicInput');
    // Seleciona o elemento do contador de cliques
    const contador = document.getElementById('contador');
    // Recupera o valor salvo do contador no localStorage ou começa em 0
    let cliques = parseInt(localStorage.getItem('contador') || '0', 10);
    // Exibe o valor inicial do contador na tela
    contador.textContent = `clicou em adicionar: ${cliques} vezes`;

    // Função que incrementa o contador, salva no localStorage e atualiza na tela
    function atualizarContador() {
        cliques++;
        localStorage.setItem('contador', cliques);
        contador.textContent = `clicou em adicionar: ${cliques} vezes`;
    }

    // Seleciona o campo de input do link da imagem
    const imageInput = document.getElementById('imageInput');
    // Seleciona o botão de adicionar música
    const addBtn = document.getElementById('addBtn');
    // Seleciona a lista onde as músicas serão exibidas
    const musicList = document.getElementById('musicList');
    // Variável para controlar se está editando uma música existente
    let editIndex = null;

    // Função que carrega as músicas salvas no localStorage e exibe na tela
    const loadMusics = () => {
        // Recupera as músicas do localStorage ou usa array vazio
        const musics = JSON.parse(localStorage.getItem('musics')) || [];
        // Limpa a lista antes de adicionar novamente
        musicList.innerHTML = '';
        // Para cada música, adiciona na lista do DOM
        musics.forEach((item, index) => {
            addMusicToDOM(item, index);
        });
    };
    
    // Função que salva o array de músicas no localStorage
    const saveMusics = (musics) => {
        localStorage.setItem('musics', JSON.stringify(musics));
    };

    // Função que adiciona uma música na lista do DOM
    const addMusicToDOM = (item, index) => {
        // Cria um elemento <li> para a música
        const li = document.createElement('li');
    
        // Se houver imagem, cria e adiciona o elemento <img>
        if (item.image && item.image.trim() !== '') {
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = 'Imagem da música';
            li.appendChild(img);
        }
    
        // Adiciona o nome da música como texto
        const text = document.createTextNode(item.name);
        li.appendChild(text);
    
        // Cria o botão de editar (ícone ✎)
        const editBtn = document.createElement('span');
        editBtn.textContent = '✎';
        editBtn.classList.add('remove'); // Usa o estilo existente
        editBtn.style.color = 'orange';  // Cor diferente para editar
        editBtn.style.right = '35px';    // Reposiciona à esquerda do remover
        // Ao clicar em editar, preenche os campos e prepara para edição
        editBtn.addEventListener('click', () => {
            musicInput.value = item.name;
            imageInput.value = item.image;
            editIndex = index;
            addBtn.textContent = 'Salvar Edição';
        });
        li.appendChild(editBtn);
    
        // Cria o botão de remover (ícone ✖)
        const removeBtn = document.createElement('span');
        removeBtn.textContent = '✖';
        removeBtn.classList.add('remove');
        // Ao clicar em remover, exclui a música da lista
        removeBtn.addEventListener('click', () => {
            removeMusic(index);
        });
    
        li.appendChild(removeBtn);
        // Adiciona o <li> na lista de músicas
        musicList.appendChild(li);
    };

    // Função para adicionar ou editar uma música
    const addMusic = () => {
        // Pega o valor do nome e da imagem
        const name = musicInput.value.trim();
        const image = imageInput.value.trim();
    
        // Não faz nada se o nome estiver vazio
        if (name === '') return;
    
        // Recupera as músicas salvas
        const musics = JSON.parse(localStorage.getItem('musics')) || [];
    
        // Se estiver editando, atualiza a música
        if (editIndex !== null) {
            musics[editIndex] = { name, image };
            editIndex = null;
            addBtn.textContent = 'Adicionar';
        } else {
            // Se não, adiciona uma nova música
            musics.push({ name, image });
        }
    
        // Salva e recarrega a lista
        saveMusics(musics);
        loadMusics();
    
        // Limpa os campos de input
        musicInput.value = '';
        imageInput.value = '';
    };
    

    // Função para remover uma música pelo índice
    const removeMusic = (index) => {
        // Recupera as músicas
        const musics = JSON.parse(localStorage.getItem('musics')) || [];
        // Remove a música do array
        musics.splice(index, 1);
        // Salva e recarrega a lista
        saveMusics(musics);
        loadMusics();
    };

    // Ao clicar no botão de adicionar, executa addMusic e incrementa o contador
    addBtn.addEventListener('click', () => {
        addMusic();
        atualizarContador();
    });
    // Ao pressionar Enter no campo de música, executa addMusic
    musicInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addMusic();
    });
    // Carrega as músicas ao iniciar a página
    loadMusics();
});
