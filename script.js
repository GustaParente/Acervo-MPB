let ultimoIndice = -1;

function obterFraseAleatoria() {
    fetch('frases.json')
      .then(response => response.json())
      .then(data => {
        let novoIndice;
        do {
          novoIndice = Math.floor(Math.random() * data.length);
        } while (novoIndice === ultimoIndice);
        
        // Armazene o novo índice como o último índice
        ultimoIndice = novoIndice;

        // Use a frase aleatória com o índice gerado
        const fraseAleatoria = data[novoIndice];
  
        // Exibir a frase na página
        const fraseElement = document.getElementById('frase');
        const fraseAutorAno = document.getElementById('autor');
        const fraseDesc = document.getElementById('desc');
        
        fraseElement.textContent = `"${fraseAleatoria.frase}"`;
        fraseAutorAno.textContent = `${fraseAleatoria.autor}, ${fraseAleatoria.ano}`;
        fraseDesc.textContent = `${fraseAleatoria.desc}`;

        const fraseVideo = document.getElementById('videoMusica');
        fraseVideo.src = fraseAleatoria.link;

        const linkMusicaElement = document.getElementById('linkMusica');
        linkMusicaElement.href = fraseAleatoria.linkYoutube;
        linkMusicaElement.style.display = 'block';        
      })
      .catch(error => {
        console.error('Erro ao obter frases: ', error);
      });
  }

  // Adicionar um evento de clique ao botão
  const botao = document.getElementById('botao');
  botao.addEventListener('click', obterFraseAleatoria);