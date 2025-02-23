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

    // Enviar mensagem para o Google Apps Script
    botaoSalvar.addEventListener("click", function () {
        const mensagem = inputTexto.value.trim();
        if (mensagem !== "") {
            // Enviar para o Google Apps Script
            fetch("https://script.google.com/macros/s/AKfycbylBb9yZnOuaQiucCYFTw_kdvJ0KgJ7Rpx0A-v14uPLZLYOmyplNkL4JwyF44XLFG3T/exec", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: mensagem }),
            })
            .then(response => {
                // Tente obter a resposta como texto
                return response.text();  // Use .text() para capturar qualquer tipo de resposta
            })
            .then(data => {
                // Se o Google Apps Script enviar uma resposta em texto, mostre-a
                console.log("Resposta do servidor:", data);
                localStorage.setItem("mensagemNaoLida", mensagem); // Armazena a mensagem
                inputTexto.value = ""; // Limpa o campo
                notificacao.style.display = "block"; // Mostra a notificação
                mensagemElemento.textContent = "Você tem uma nova mensagem!"; // Oculta o conteúdo real
            })
            .catch(error => {
                console.error("Erro ao enviar a mensagem:", error);
                alert("Erro ao enviar a mensagem. Tente novamente.");
            });
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