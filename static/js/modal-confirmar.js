const modalConfirmar = document.querySelector('#confirmar-modal');

modalConfirmar.querySelector('.fechar').addEventListener('click', () => {
    fecharModalConfirmar();
});

function abrirModalConfirmar(titulo, texto, callback, ...parametros) {
    modalConfirmar.style.visibility = 'visible';
    modalConfirmar.style.opacity = '1';

    modalConfirmar.querySelector('.titulo').textContent = titulo;
    modalConfirmar.querySelector('.texto').textContent = texto;

    let botaoConfirmar = modalConfirmar.querySelector('.confirmar')
    let novoBotaoConfirmar = botaoConfirmar.cloneNode(true);

    botaoConfirmar.parentNode.replaceChild(novoBotaoConfirmar, botaoConfirmar);
    
    novoBotaoConfirmar.addEventListener('click', () => {
        if (callback) callback(...parametros);
        fecharModalConfirmar();
    });
}

function fecharModalConfirmar() {
    modalConfirmar.style.opacity = '0';
    setTimeout(() => {
        modalConfirmar.style.visibility = 'hidden';
    }, 500);
}

