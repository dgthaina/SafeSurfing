const modalNewsletter = document.querySelector('#newsletter-modal');

modalNewsletter.querySelector('.fechar').addEventListener('click', () => {
    fecharModalNewsletter();
});

function abrirModalNewsletter() {
    modalNewsletter.style.visibility = 'visible';
    modalNewsletter.style.opacity = '1';
}

function fecharModalNewsletter() {
    modalNewsletter.style.opacity = '0';
    setTimeout(() => {
        modalNewsletter.style.visibility = 'hidden';
    }, 500);
}

document.querySelectorAll('.novo-e-mail').forEach((e) => {
    e.addEventListener('click', () => {
        abrirModalNewsletter();
    });
});

modalNewsletter.querySelector('button').addEventListener('click', async () => {
    let titulo = document.getElementsByName('titulo')[0].value;

    if (titulo == '') {
        abrirStatusModal(false, 'Digite um título para o e-mail.');
        return;
    }

    let resposta = await fetch('/api/e-mail', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'titulo': titulo
        })
    });
    
    let respostaJSON = await resposta.json();

    if (!respostaJSON.ok) {
        abrirStatusModal(false, respostaJSON.mensagem);
        return;
    }

    let id = respostaJSON.id;

    window.location.href = '/admin/newsletter/e-mail/' + id;
});