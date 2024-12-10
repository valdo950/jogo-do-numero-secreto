//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'jogo do acerte o numero secreto';

//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'escolha um numero de 1 a 20' ;
let listaDeNumerosSorteados = [];
let numeroLimite = 30;
let numeroSecreto = gerarnumeroAleatorio();
let tentativa = 1 ;

function exibirTextonaTela(tag, texto) {
    let campo = document.querySelector(tag) ;
    campo.innerHTML = texto ;
  //  responsiveVoice.speak(texto,'Brazilian Portuguese Female', {rate:1.2});
  if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.2; 
    window.speechSynthesis.speak(utterance); 
} else {
    console.log("Web Speech API não suportada neste navegador.");
}
}

function exibirMensagemInicial() {
exibirTextonaTela('h1', 'jogo do numero secreto da Maitê') ;
exibirTextonaTela('p', 'escolha um numero de 1 a 30') ;
};
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value ;
    if (numeroSecreto == chute){
      exibirTextonaTela('h1' , 'maitê voce ganhooou parabens!!');
      let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
      let mensagenTentativa = `voce acertou o numero secreto com ${tentativa} ${palavraTentativa}`;
      exibirTextonaTela('p' , mensagenTentativa);
      document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
      if (chute > numeroSecreto){
        exibirTextonaTela('p', ' o numero secreto é menor');
      }else{
        exibirTextonaTela('p', ' o numero secreto é maior');
      }
      tentativa ++;
      limparCampo();

    }
    console.log(chute == numeroSecreto) ;
}
function gerarnumeroAleatorio() {
  //return parseInt( Math.random() * 30 +1); 
  let numeroEscolhido = parseInt( Math.random() * numeroLimite +1);
  let quantidadeDeNumerosEscolhidos = listaDeNumerosSorteados.length;

  if (quantidadeDeNumerosEscolhidos == numeroLimite ){
    listaDeNumerosSorteados = [];
  }

  if (listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarnumeroAleatorio();
  }else{
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
  }
}
function limparCampo() {
  chute = document.querySelector('input');
  chute.value = '';
}
function reiniciarJogo() {
  numeroSecreto = gerarnumeroAleatorio();
  limparCampo();
  tentativa = 1;
  exibirMensagemInicial();
  document.getElementById('reiniciar').setAttribute('disabled', true);
}