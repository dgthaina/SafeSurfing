document.querySelector('#login .campos button').addEventListener('click', () => {
    let usuario = document.getElementsByName('usuario')[0].value;
    let senha = document.getElementsByName('senha')[0].value;

    if (usuario == '' || senha == '') {
        abrirStatusModal(false, 'Preencha o formulário corretamente.');
        return;
    }

    if (false) {
        abrirStatusModal(false, 'Não autorizado. Confira suas credenciais.');
        return;
    }

    window.location.href = 'newsletter.html';
});
