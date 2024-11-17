const statusModal = document.querySelector('#status-modal');

statusModal.querySelector('.fechar').addEventListener('click', () => {
    fecharStatusModal();
});

function abrirStatusModal(status, mensagem) {
    if (statusModal.style.visibility == 'visible') {
        return;
    }

    statusModal.style.visibility = 'visible';
    statusModal.style.opacity = '1';
    statusModal.querySelector('.container span:first-child').textContent = status ? 'check_circle' : 'error';
    statusModal.querySelector('.container span:first-child').style.color = status ? 'green' : 'brown';
    statusModal.querySelector('.container .texto-modal h5').textContent = status ? 'Ok' : 'Erro';
    statusModal.querySelector('.container .texto-modal p').textContent = mensagem;

    setTimeout(fecharStatusModal, 3000);
}

function fecharStatusModal() {
    statusModal.style.opacity = '0';
    setTimeout(() => {
        statusModal.style.visibility = 'hidden';
    }, 500);
}
