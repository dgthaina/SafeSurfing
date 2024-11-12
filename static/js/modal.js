const modal = document.querySelector('#modal');

modal.querySelector('button').addEventListener('click', () => {
    fecharModal();
});

function abrirModal(titulo, texto) {
    modal.style.visibility = 'visible';
    modal.style.opacity = '1';
    modal.querySelector('.titulo').innerText = titulo;
    modal.querySelector('.texto').innerText = texto;
}

function fecharModal() {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.visibility = 'hidden';
    }, 500);
}
