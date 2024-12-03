async function login() {
    let usuario = document.getElementsByName('usuario')[0].value;
    let senha = document.getElementsByName('senha')[0].value;

    if (usuario == '' || senha == '') {
        abrirStatusModal(false, 'Preencha o formulário corretamente.');
        return;
    }

    let resposta = await fetch('/admin/login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'usuario': usuario,
            'senha': senha
        })
    });

    let respostaJSON = await resposta.json();

    if (!respostaJSON.ok) {
        abrirStatusModal(false, respostaJSON.mensagem);
        return;
    }

    window.location.href = '/admin/newsletter';
}

document.querySelector('#login .campos button').addEventListener('click', login);
document.addEventListener('keyup', ({key}) => {
    if (key == 'Enter') {
        login();
    }
});
