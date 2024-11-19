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
        modal.style.visibility = 'hidden';
    }, 500);
}
