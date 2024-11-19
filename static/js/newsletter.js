document.querySelector('#nav-newsletter .voltar').addEventListener('click', () => {
    window.location.href = 'newsletter-menu.html';
});

let contadorParagrafos = 1;
let contadorImagens = 1;

document.querySelector('#e-mail .itens .botoes .adicionar-paragrafo').addEventListener('click', () => {
    let paragrafo = document.createElement('div');
    paragrafo.classList.add('item', 'paragrafo', `p${contadorParagrafos}`);

    let campo = document.createElement('div');
    campo.classList.add('campo');

    let label = document.createElement('label');
    label.setAttribute('for', `p${contadorParagrafos}`);
    label.textContent = 'Parágrafo';

    let textarea = document.createElement('textarea');
    textarea.setAttribute('name', `p${contadorParagrafos}`);

    campo.appendChild(label);
    campo.appendChild(textarea);

    let icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined', 'deletar');
    icon.textContent = 'delete';
    icon.addEventListener('click', () => {
       paragrafo.remove(); 
    });

    paragrafo.appendChild(campo);
    paragrafo.appendChild(icon);

    document.querySelector('#e-mail .itens').insertBefore(paragrafo, document.querySelector('#e-mail .itens .botoes'));

    contadorParagrafos++;
});

document.querySelector('#e-mail .itens .botoes .adicionar-imagem').addEventListener('click', () => {
    let imagem = document.createElement('div');
    imagem.classList.add('item', 'imagem', `img${contadorImagens}`);

    let campo = document.createElement('div');
    campo.classList.add('campo');

    let label = document.createElement('label');
    label.setAttribute('for', `img${contadorImagens}`);
    label.textContent = 'Imagem';

    let input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('name', `img${contadorImagens}`);

    let img = document.createElement('img');

    input.addEventListener('change', () => {
       img.src = window.URL.createObjectURL(input.files[0]);
    });

    let button = document.createElement('button');
    button.textContent = 'Enviar imagem';
    button.addEventListener('click', () => {
        input.click();
    });

    campo.appendChild(label);
    campo.appendChild(input);
    campo.appendChild(img);
    campo.appendChild(button);

    let icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined', 'deletar');
    icon.textContent = 'delete';
    icon.addEventListener('click', () => {
       imagem.remove(); 
    });

    imagem.appendChild(campo);
    imagem.appendChild(icon);

    document.querySelector('#e-mail .itens').insertBefore(imagem, document.querySelector('#e-mail .itens .botoes'));

    contadorImagens++;
});
