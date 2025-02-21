document.addEventListener("DOMContentLoaded", function () {
    const inputTexto = document.getElementById("texto");
    const botaoSalvar = document.getElementById("save-message");
    const notificacao = document.getElementById("notif");
    const mensagemElemento = document.getElementById("mensagem");
    const botaoFechar = document.getElementById("close-notification");

    // Verifica se há uma mensagem salva e não lida
    if (localStorage.getItem("mensagemNaoLida")) {
        notificacao.style.display = "block"; // Mostra a notificação
        mensagemElemento.textContent = "Você tem uma nova mensagem!"; // Oculta o conteúdo real
    }

    // Salvar mensagem no localStorage
    botaoSalvar.addEventListener("click", function () {
        const mensagem = inputTexto.value.trim();
        if (mensagem !== "") {
            localStorage.setItem("mensagemNaoLida", mensagem); // Armazena a mensagem
            inputTexto.value = ""; // Limpa o campo
            notificacao.style.display = "block"; // Mostra a notificação
            mensagemElemento.textContent = "Você tem uma nova mensagem!"; // Mantém oculto
        } else {
            alert("Não vai escrever nadinha? :(");
        }
    });

    // Quando clicar na notificação, mostrar a mensagem real e marcar como lida
    botaoFechar.addEventListener("click", function () {
        const mensagemSalva = localStorage.getItem("mensagemNaoLida");
        if (mensagemSalva) {
            mensagemElemento.textContent = `"${mensagemSalva}"`; // Revela a mensagem real
            localStorage.removeItem("mensagemNaoLida"); // Remove do armazenamento
        } else {
            notificacao.style.display = "none"; // Esconde a notificação se não houver mensagem
        }
    });
});
