
let ultimoIndice = -1;

function obterFraseAutor() {
  const seletor = document.getElementById('seletor');
  const autor = seletor.value;
    fetch('frases.json')
      .then(response => response.json())
      .then(data => {
        let dadosFiltrados = data.filter(item => item.autor === autor);
        let novoIndice = dadosFiltrados;
        novoIndice = Math.floor(Math.random() * dadosFiltrados.length);
        
        
        // Armazene o novo índice como o último índice
        ultimoIndice = novoIndice;

        // Use a frase aleatória com o índice gerado
        const fraseAleatoria = dadosFiltrados[novoIndice];
  
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
  botao.addEventListener('click', obterFraseAleatoria());
  obterFraseAutor();

        var txtInput = document.querySelector('#frase');
        var voiceList = document.querySelector('#voiceList');
        var btnSpeak = document.querySelector('#btnSpeak');
        var synth = window.speechSynthesis;
        var voices = [];

        PopulateVoices();
        if(speechSynthesis !== undefined){
            speechSynthesis.onvoiceschanged = PopulateVoices;
        }

        btnSpeak.addEventListener('click', ()=> {
            var toSpeak = new SpeechSynthesisUtterance(txtInput.textContent);
            var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
            voices.forEach((voice)=>{
                if(voice.name === selectedVoiceName){
                    toSpeak.voice = voice;
                }
            });
            synth.speak(toSpeak);
        });

        function PopulateVoices(){
            voices = synth.getVoices();
            var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
            voiceList.innerHTML = '';
            voices.forEach((voice)=>{
                var listItem = document.createElement('option');
                listItem.textContent = voice.name;
                listItem.setAttribute('data-lang', voice.lang);
                listItem.setAttribute('data-name', voice.name);
                voiceList.appendChild(listItem);
            });

            voiceList.selectedIndex = selectedIndex;
        }

function darkMode(){
  const body = document.getElementById('body');
  const botao = document.getElementById('botao');
  const botao2 = document.getElementById('btnSpeak');
  const cartao = document.getElementById('cartao');
  const footer = document.getElementById('footer');
  const btndark = document.getElementById('darkmode');
  const iconedk = document.getElementById('iconedk');

  if (body.classList.contains('main')){
    body.classList.remove('main');
    botao.classList.remove('botaodark');
    botao2.classList.remove('botao2dark');
    cartao.classList.remove('cartaodark');
    footer.classList.remove('footerdark');
    btndark.classList.remove('darkmodebtndark');
    iconedk.classList.add('darkbtn');
    
} else {
    body.classList.add('main');
    botao.classList.add('botaodark');
    botao2.classList.add('botao2dark');
    cartao.classList.add('cartaodark');
    footer.classList.add('footerdark');
    btndark.classList.add('darkmodebtndark');
    iconedk.classList.remove('darkbtn');
    
}
}

const btndark = document.getElementById('darkmode');
btndark.addEventListener('click', darkMode());