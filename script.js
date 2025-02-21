// script de troca de imagem e de senha
function trocarimagem() {
    var gatinho = document.getElementById("gatinho");
    gatinho.innerHTML = '<source src="Imagens/gato2.mp4" type="video/mp4">';
gatinho.load(); 
gatinho.play();

  }
  function mostrarcamposenha() {
    var container = document.getElementById("senha-container");
    container.style.display = "block";
    setTimeout(() => {
      container.style.opacity = "1";
    }, 10);
  }
  function verificarsenha() {
    var senhaCorreta = btoa("102030"); // Codifica a senha em Base64
    var senhaDigitada = btoa(document.getElementById("senha").value);

    if (senhaDigitada === senhaCorreta) {
      window.location.href = "links.html"; // Redireciona
    } else {
      alert("Boa tentativa, Orochimaru! Vá embora!");
    }
  }
  document.addEventListener("DOMContentLoaded", function() {
    const video = document.querySelector("video");
    video.play();
});
