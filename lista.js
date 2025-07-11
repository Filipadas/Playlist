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
        cliques++; // Incrementa o valor do contador
        localStorage.setItem('contador', cliques); // Salva o novo valor no localStorage
        contador.textContent = `clicou em adicionar: ${cliques} vezes`; // Atualiza o texto na tela
        
    }

    // Seleciona o campo de input do link da imagem
    const imageInput = document.getElementById('imageInput');
    // Seleciona o botão de adicionar música
    const addBtn = document.getElementById('addBtn');
    // Seleciona a lista onde as músicas serão exibidas
    const musicList = document.getElementById('musicList');
    // Variável para controlar se está editando uma música existente
    let editIndex = null;

    // Seleciona o switch de tema
    const themeToggle = document.getElementById('theme-toggle');

    // Seleciona o botão de acessibilidade daltônica
    const daltonicToggle = document.getElementById('daltonic-toggle');
    // Função para aplicar ou remover o modo daltônico
    function aplicarDaltonic(ativo) {
        if (ativo) {
            document.body.classList.add('daltonic-theme'); // Adiciona a classe do modo daltônico
        } else {
            document.body.classList.remove('daltonic-theme'); // Remove a classe do modo daltônico
        }
    }

    // Ao carregar a página, verifica se o modo daltônico está ativado
    const daltonicAtivo = localStorage.getItem('daltonic') === 'true'; // Verifica se está ativado
    aplicarDaltonic(daltonicAtivo); // Aplica o modo salvo

    // Atualiza o texto do botão conforme o estado
    daltonicToggle.textContent = daltonicAtivo ? 'Acessibilidade Daltônica: ON' : 'Acessibilidade Daltônica';

    // Evento de clique no botão de acessibilidade daltônica
    daltonicToggle.addEventListener('click', () => {
        const novoEstado = !document.body.classList.contains('daltonic-theme'); // Inverte o estado
        aplicarDaltonic(novoEstado); // Aplica o novo estado
        localStorage.setItem('daltonic', novoEstado); // Salva no localStorage
        daltonicToggle.textContent = novoEstado ? 'Acessibilidade Daltônica: ON' : 'Acessibilidade Daltônica : OFF'; // Atualiza o texto do botão
    });


    //MODO ROSA Ainda n está pronto
    const pinkmodeToggle = document.getElementById('pinkmode-toggle');{
    //aplicar ou remover
    function aplicarPink(ativo) {
        if (ativo) {
            document.body.classList.add('pinkmode-theme');
        } else {
            document.body.classList.remove('pinkmode-theme');
        }
    }

    const pinkmodeToggle = localStorage.getItem('pinkmode') === 'true';
    aplicarPink(pinkmodeAtivo);

    pinkmodeToggle.textContent = pinkmodeAtivo ? 'Modo Rosa : ON' : 'Modo Rosa: OFF'

    pinkmodeToggle.addEventListener('click', ()=>{
        const novoEstado = !document.body.classList.contains('pinkmode-theme');
        aplicarPink(novoEstado);
        localStorage.setItem('pinkmode', novoEstado); 
        pinkmodeToggle.textContent = novoEstado ? 'Modo Rosa: ON' : 'Modo Rosa: OFF';
        });
    }
    //Fim do Modo Rosa

    // Função para aplicar o tema (claro ou escuro)
    function aplicarTema(tema) {
        if (tema === 'escuro') {
            document.body.classList.remove('light-theme'); // Remove a classe de tema claro
        } else {
            document.body.classList.add('light-theme'); // Adiciona a classe de tema claro
        }
    }

    // Ao carregar a página, verifica o tema salvo no localStorage
    const temaSalvo = localStorage.getItem('tema') || 'escuro'; // Pega o tema salvo ou usa escuro
    aplicarTema(temaSalvo); // Aplica o tema salvo
    themeToggle.checked = temaSalvo === 'escuro' ? true : false; // Marca o switch conforme o tema

    // Evento de mudança do switch
    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            aplicarTema('escuro'); // Se marcado, aplica tema escuro
            localStorage.setItem('tema', 'escuro'); // Salva escolha
        } else {
            aplicarTema('claro'); // Se desmarcado, aplica tema claro
            localStorage.setItem('tema', 'claro'); // Salva escolha
        }
    });

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
        localStorage.setItem('musics', JSON.stringify(musics)); // Salva o array de músicas
    };

    // Função que adiciona uma música na lista do DOM
    const addMusicToDOM = (item, index) => {
        // Cria um elemento <li> para a música
        const li = document.createElement('li');
    
        // Se houver imagem, cria e adiciona o elemento <img>
        if (item.image && item.image.trim() !== '') {
            const img = document.createElement('img');
            img.src = item.image; // Define o link da imagem
            img.alt = 'Imagem da música'; // Texto alternativo
            li.appendChild(img); // Adiciona a imagem ao <li>
        }
    
        // Adiciona o nome da música como texto
        const text = document.createTextNode(item.name);
        li.appendChild(text); // Adiciona o texto ao <li>
    
        // Cria o botão de editar (ícone ✎)
        const editBtn = document.createElement('span');
        editBtn.textContent = '✎'; // Ícone de edição
        editBtn.classList.add('remove'); // Usa o estilo existente
        editBtn.style.color = 'orange';  // Cor diferente para editar
        editBtn.style.right = '35px';    // Reposiciona à esquerda do remover
        // Ao clicar em editar, preenche os campos e prepara para edição
        editBtn.addEventListener('click', () => {
            musicInput.value = item.name; // Preenche o input com o nome
            imageInput.value = item.image; // Preenche o input com a imagem
            editIndex = index; // Marca o índice para edição
            addBtn.textContent = 'Salvar Edição'; // Muda o texto do botão
        });
        li.appendChild(editBtn); // Adiciona o botão de editar ao <li>
    
        // Cria o botão de remover (ícone ✖)
        const removeBtn = document.createElement('span');
        removeBtn.textContent = '✖'; // Ícone de remover
        removeBtn.classList.add('remove');
        // Ao clicar em remover, exclui a música da lista
        removeBtn.addEventListener('click', () => {
            removeMusic(index); // Chama a função para remover
        });
    
        li.appendChild(removeBtn); // Adiciona o botão de remover ao <li>
        // Adiciona o <li> na lista de músicas
        musicList.appendChild(li);
    };

    // Função para adicionar ou editar uma música
    const addMusic = () => {
        // Pega o valor do nome e da imagem
        const name = musicInput.value.trim(); // Remove espaços do nome
        const image = imageInput.value.trim(); // Remove espaços da imagem
    
        // Não faz nada se o nome estiver vazio
        if (name === '') return;
    
        // Recupera as músicas salvas
        const musics = JSON.parse(localStorage.getItem('musics')) || [];
    
        // Se estiver editando, atualiza a música
        if (editIndex !== null) {
            musics[editIndex] = { name, image }; // Atualiza a música
            editIndex = null; // Sai do modo edição
            addBtn.textContent = 'Adicionar'; // Volta o texto do botão
        } else {
            // Se não, adiciona uma nova música
            musics.push({ name, image }); // Adiciona ao array
        }
    
        // Salva e recarrega a lista
        saveMusics(musics); // Salva no localStorage
        loadMusics(); // Atualiza a lista na tela
    
        // Limpa os campos de input
        musicInput.value = '';
        imageInput.value = '';
    };
    

    // Função para remover uma música pelo índice
    const removeMusic = (index) => {
        // Recupera as músicas
        const musics = JSON.parse(localStorage.getItem('musics')) || [];
        // Remove a música do array
        musics.splice(index, 1); // Remove pelo índice
        // Salva e recarrega a lista
        saveMusics(musics); // Salva no localStorage
        loadMusics(); // Atualiza a lista na tela
    };

    // Ao clicar no botão de adicionar, executa addMusic e incrementa o contador
    addBtn.addEventListener('click', () => {
        addMusic(); // Adiciona a música
        atualizarContador(); // Incrementa o contador
    });
    // Ao pressionar Enter no campo de música, executa addMusic
    musicInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addMusic(); // Se apertar Enter, adiciona música
    });
    // Carrega as músicas ao iniciar a página
    loadMusics(); // Exibe as músicas salvas ao abrir a página
});
