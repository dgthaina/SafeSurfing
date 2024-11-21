const chat = document.querySelector('#chat');

document.querySelector('#li-chat').addEventListener('click', () => {
    abrirChat();
});

chat.querySelector('.fechar').addEventListener('click', () => {
    fecharChat();
});

function abrirChat() {
    chat.style.visibility = 'visible';
    chat.style.opacity = '1';
}

function fecharChat() {
    chat.style.opacity = '0';
    setTimeout(() => {
        chat.style.visibility = 'hidden';
    }, 500);
}

function adicionarPergunta(texto) {
    chat.querySelector('.vazio').style.display = 'none';
    texto = texto.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
    chat.querySelector('.mensagens').innerHTML += `<div class="mensagem pergunta">${texto}</div>`;
}

function adicionarResposta(texto) {
    chat.querySelector('.vazio').style.display = 'none';
    texto = texto.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#039;');
    chat.querySelector('.mensagens').innerHTML += `<div class="mensagem resposta">${texto}</div>`;
}

async function enviarPergunta(pergunta) {
    let resposta = await fetch('/api/chat/perguntar', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'pergunta': pergunta
        })
    });

    let respostaJSON = await resposta.json();

    return respostaJSON
}

const textarea = chat.querySelector('textarea');

textarea.addEventListener('input', () => {
    if (textarea.value == '') {
        textarea.style.height = '2em';
        return;
    }
    textarea.style.height = 'auto';
});

let aguardandoResposta = false;

chat.querySelector('.acoes button').addEventListener('click', async () => {
    if (aguardandoResposta) {
        return;
    }

    aguardandoResposta = true;

    adicionarPergunta(chat.querySelector('.acoes textarea').value);

    let pergunta = chat.querySelector('.acoes textarea').value;
    
    chat.querySelector('.acoes textarea').value = '';

    adicionarResposta('...');

    let resposta = await enviarPergunta(pergunta);

    chat.querySelector('.mensagens .resposta:last-child').textContent = resposta.ok ? resposta.resposta : resposta.mensagem;
    chat.querySelector('.mensagens .resposta:last-child').style.backgroundColor = resposta.ok ? '#80472d' : 'brown';

    aguardandoResposta = false;
});
