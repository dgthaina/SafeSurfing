document.querySelector('#nav-newsletter .voltar').addEventListener('click', () => {
    window.location.href = 'newsletter-menu.html';
});

// document.querySelector('#e-mail .itens .imagem button').addEventListener('click', () => {
//     document.querySelector('#e-mail .itens .imagem input').click();
// });

// document.querySelector('#e-mail .itens .imagem input').addEventListener('change', () => {
//     document.querySelector('#e-mail .itens .imagem img').src = window.URL.createObjectURL(document.querySelector('#e-mail .itens .imagem input').files[0]);
//     document.querySelector('#e-mail .itens .imagem img').style.padding = '1em';
// });

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

    let button = document.createElement('button');
    button.textContent = 'Enviar imagem';

    campo.appendChild(label);
    campo.appendChild(input);
    campo.appendChild(img);
    campo.appendChild(button);

    let icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined', 'deletar');
    icon.textContent = 'delete';

    imagem.appendChild(campo);
    imagem.appendChild(icon);

    document.querySelector('#e-mail .itens').insertBefore(imagem, document.querySelector('#e-mail .itens .botoes'));

    contadorImagens++;
});

{/* <div class="item paragrafo p1">
    <div class="campo">
        <label for="p1">Parágrafo</label>
        <textarea name="p1"></textarea>
    </div>
    <span class="material-symbols-outlined deletar">delete</span>
</div> */}