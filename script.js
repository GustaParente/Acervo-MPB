let ultimoIndice = -1;

// Função do menu SELECT que pega uma frase do artista escolhido e trata suas informações
function obterFraseAutor() {
  const seletor = document.getElementById("seletor");
  const autor = seletor.value;
  fetch("frases.json")
    .then((response) => response.json())
    .then((data) => {
      let dadosFiltrados = data.filter((item) => item.autor === autor);
      let novoIndice = dadosFiltrados;

      // Se o artista tiver mais de 1 música cadastrada no site, a função irá sortear uma delas para exibir
      novoIndice = Math.floor(Math.random() * dadosFiltrados.length);

      // Impedir que a função "aleatório" repita a última frase escolhida
      ultimoIndice = novoIndice;
      const fraseAleatoria = dadosFiltrados[novoIndice];

      // Atribuindo os dados aos elementos HTML correspondentes
      const fraseElement = document.getElementById("frase");
      const fraseAutorAno = document.getElementById("autor");
      const fraseDesc = document.getElementById("desc");
      fraseElement.textContent = `"${fraseAleatoria.frase}"`;
      fraseAutorAno.textContent = `${fraseAleatoria.autor}, ${fraseAleatoria.ano}`;
      fraseDesc.textContent = `${fraseAleatoria.desc}`;

      // Botões de "ouvir" de cada plataforma
      const fraseVideo = document.getElementById("video");
      fraseVideo.href = fraseAleatoria.link;
      const spotify = document.getElementById("spotify");
      spotify.href = fraseAleatoria.spotify;
      const deezer = document.getElementById("deezer");
      deezer.href = fraseAleatoria.deezer;

      // Botão que redireciona ao link da letra
      const letraElement = document.getElementById("letra");
      letraElement.href = fraseAleatoria.letra;
      letraElement.style.display = "block";
    })
    .catch((error) => {
      console.error("Erro ao obter frases: ", error);
    });
}

// Função do botão ALEATÓRIO que pega uma frase de qualquer artista cadastrado no site
function obterFraseAleatoria() {
  fetch("frases.json")
    .then((response) => response.json())
    .then((data) => {
      let novoIndice;
      do {
        novoIndice = Math.floor(Math.random() * data.length);
      } while (novoIndice === ultimoIndice);

      // Impedir que a função "aleatório" repita a última frase escolhida
      ultimoIndice = novoIndice;
      const fraseAleatoria = data[novoIndice];

      // Atribuindo os dados aos elementos HTML correspondentes
      const fraseElement = document.getElementById("frase");
      const fraseAutorAno = document.getElementById("autor");
      const fraseDesc = document.getElementById("desc");
      fraseElement.textContent = `"${fraseAleatoria.frase}"`;
      fraseAutorAno.textContent = `${fraseAleatoria.autor}, ${fraseAleatoria.ano}`;
      fraseDesc.textContent = `${fraseAleatoria.desc}`;

      // Botões de "ouvir" de cada plataforma
      const fraseVideo = document.getElementById("video");
      fraseVideo.href = fraseAleatoria.link;
      const spotify = document.getElementById("spotify");
      spotify.href = fraseAleatoria.spotify;
      const deezer = document.getElementById("deezer");
      deezer.href = fraseAleatoria.deezer;

      // Botão que redireciona ao link da letra
      const letraElement = document.getElementById("letra");
      letraElement.href = fraseAleatoria.letra;
      letraElement.style.display = "block";
    })
    .catch((error) => {
      console.error("Erro ao obter frases: ", error);
    });
}

// Listener e chamando a função para que mesmo sendo sua primeira vez no site, já mostre uma frase aleatória
const botao = document.getElementById("botao");
botao.addEventListener("click", obterFraseAleatoria());
obterFraseAutor();

// Código inteiro abaixo referente ao text to speech, por questões de acessibilidade
var txtInput = document.querySelector("#frase");
var voiceList = document.querySelector("#voiceList");
var btnSpeak = document.querySelector("#btnSpeak");
var synth = window.speechSynthesis;
var voices = [];

PopulateVoices();
if (speechSynthesis !== undefined) {
  speechSynthesis.onvoiceschanged = PopulateVoices;
}

btnSpeak.addEventListener("click", () => {
  var toSpeak = new SpeechSynthesisUtterance(txtInput.textContent);
  var selectedVoiceName =
    voiceList.selectedOptions[0].getAttribute("data-name");
  voices.forEach((voice) => {
    if (voice.name === selectedVoiceName) {
      toSpeak.voice = voice;
    }
  });
  synth.speak(toSpeak);
});

function PopulateVoices() {
  voices = synth.getVoices();
  var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
  voiceList.innerHTML = "";
  voices.forEach((voice) => {
    var listItem = document.createElement("option");
    listItem.textContent = voice.name;
    listItem.setAttribute("data-lang", voice.lang);
    listItem.setAttribute("data-name", voice.name);
    voiceList.appendChild(listItem);
  });

  voiceList.selectedIndex = selectedIndex;
}
