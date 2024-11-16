document.querySelector('#login .campos button').addEventListener('click', () => {
    let usuario = document.getElementsByName('usuario')[0].value;
    let senha = document.getElementsByName('senha')[0].value;

    if (usuario == '' || senha == '') {
        abrirModal('Preencha o formulário corretamente.');
        return;
    }

    if (false) {
        abrirModal('Não autorizado. Confira suas credenciais.');
        return;
    }

    window.location.href = 'newsletter.html';
});

const modal = document.querySelector('#login-modal');

modal.querySelector('.fechar').addEventListener('click', () => {
    fecharModal();
});

function abrirModal(erro) {
    if (modal.style.visibility == 'visible') {
        return;
    }

    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    modal.querySelector('.container .texto-modal p').textContent = erro;

    setTimeout(fecharModal, 3000);
}

function fecharModal() {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.visibility = 'hidden';
    }, 500);
}
