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

document.querySelectorAll('.novo-email').forEach((e) => {
    e.addEventListener('click', () => {
        abrirModalNewsletter();
    });
});

modalNewsletter.querySelector('button').addEventListener('click', () => {
    let titulo = document.getElementsByName('titulo')[0].value;

    if (titulo == '') {
        abrirStatusModal(false, 'Digite um título para o e-mail.')
    }
});