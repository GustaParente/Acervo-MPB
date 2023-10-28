function obterFraseAleatoria() {
    fetch('frases.json')
      .then(response => response.json())
      .then(data => {
        // Escolher uma frase aleatória
        const fraseAleatoria = data[Math.floor(Math.random() * data.length)];
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
        linkMusicaElement.href = fraseAleatoria.link;
        linkMusicaElement.style.display = 'block';
        
      })
      .catch(error => {
        console.error('Erro ao obter frases: ', error);
      });
  }

  // Adicionar um evento de clique ao botão
  const botao = document.getElementById('botao');
  botao.addEventListener('click', obterFraseAleatoria);