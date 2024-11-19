document.querySelector('#nav-newsletter .voltar').addEventListener('click', () => {
    window.location.href = 'newsletter-menu.html';
});

document.querySelector('#e-mail .itens .imagem button').addEventListener('click', () => {
    document.querySelector('#e-mail .itens .imagem input').click();
});

document.querySelector('#e-mail .itens .imagem input').addEventListener('change', () => {
    document.querySelector('#e-mail .itens .imagem img').src = window.URL.createObjectURL(document.querySelector('#e-mail .itens .imagem input').files[0]);
});