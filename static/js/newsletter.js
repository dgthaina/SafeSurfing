let id = parseInt(window.location.href.split('/').pop());

function adicionarParagrafo(conteudo) {
    let paragrafoPreview = document.createElement('p');

    let paragrafo = document.createElement('div');
    paragrafo.classList.add('item', 'paragrafo', `p${contadorParagrafos}`);

    let campo = document.createElement('div');
    campo.classList.add('campo');

    let label = document.createElement('label');
    label.setAttribute('for', `p${contadorParagrafos}`);
    label.textContent = 'Parágrafo';

    let textarea = document.createElement('textarea');
    textarea.setAttribute('name', `p${contadorParagrafos}`);
    textarea.addEventListener('keydown', () => {
        paragrafoPreview.textContent = textarea.value;
    });
    textarea.addEventListener('keyup', () => {
        paragrafoPreview.textContent = textarea.value;
    });

    textarea.value = conteudo;
    paragrafoPreview.textContent = conteudo;

    campo.appendChild(label);
    campo.appendChild(textarea);

    let icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined', 'deletar');
    icon.textContent = 'delete';
    icon.addEventListener('click', () => {
       paragrafo.remove();
       paragrafoPreview.remove();
    });

    paragrafo.appendChild(campo);
    paragrafo.appendChild(icon);

    document.querySelector('#e-mail .itens').insertBefore(paragrafo, document.querySelector('#e-mail .itens .botoes'));

    document.querySelector('#e-mail .preview .conteudo').appendChild(paragrafoPreview);

    contadorParagrafos++;
}

function adicionarImagem(conteudo) {
    let figura = document.createElement('figure');

    let img = document.createElement('img');

    let imagemPreview = document.createElement('img');

    figura.appendChild(imagemPreview);
    
    let imagem = document.createElement('div');
    imagem.classList.add('item', 'imagem', `img${contadorImagens}`);

    let campo = document.createElement('div');
    campo.classList.add('campo');

    let label = document.createElement('label');
    label.setAttribute('for', `img${contadorImagens}`);
    label.textContent = 'Imagem';

    let textarea = document.createElement('textarea');
    textarea.setAttribute('name', `img${contadorImagens}`);
    textarea.addEventListener('keydown', () => {
        img.src = textarea.value;
        imagemPreview.src = textarea.value;
    });
    textarea.addEventListener('keyup', () => {
        img.src = textarea.value;
        imagemPreview.src = textarea.value;
    });

    textarea.textContent = conteudo;
    img.src = conteudo;
    imagemPreview.src = conteudo;

    campo.appendChild(label);
    campo.appendChild(textarea);
    campo.appendChild(img);

    let icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined', 'deletar');
    icon.textContent = 'delete';
    icon.addEventListener('click', () => {
       imagem.remove();
       figura.remove();
    });

    imagem.appendChild(campo);
    imagem.appendChild(icon);

    document.querySelector('#e-mail .itens').insertBefore(imagem, document.querySelector('#e-mail .itens .botoes'));

    document.querySelector('#e-mail .preview .conteudo').appendChild(figura);

    contadorImagens++;
}

document.addEventListener('DOMContentLoaded', async () => {
    let resposta = await fetch('/api/e-mail/' + id);

    let respostaJSON = await resposta.json();

    if (!respostaJSON.ok) {
        abrirStatusModal(false, respostaJSON.mensagem);
        return;
    }

    let email = respostaJSON.resultado;

    if (email.enviado) {
        document.querySelector('#e-mail-botoes').style.display = 'none';
        document.querySelector('#e-mail .itens').style.display = 'none';
        document.querySelector('#e-mail .preview').style.maxWidth = '100%';   
    }

    document.querySelector('#e-mail .itens .titulo-email .campo textarea').value = email.titulo;
    document.querySelector('#e-mail .preview .conteudo h2').textContent = email.titulo;

    if (!email.conteudo) {
        return;
    }

    for (let item of email.conteudo) {
        if (item.tipo == 'paragrafo') {
            adicionarParagrafo(item.conteudo);
            continue;
        }
        adicionarImagem(item.conteudo);
    };
});

document.querySelector('#nav-newsletter .logo').addEventListener('click', () => {
    window.location.href = '/';
});

document.querySelector('#nav-newsletter .voltar').addEventListener('click', () => {
    window.location.href = '/admin/newsletter';
});

let contadorParagrafos = 1;
let contadorImagens = 1;

document.querySelector('#e-mail .itens .botoes .adicionar-paragrafo').addEventListener('click', () => {
    adicionarParagrafo('');
});

document.querySelector('#e-mail .itens .botoes .adicionar-imagem').addEventListener('click', () => {
    adicionarImagem('');
});

document.querySelector('#e-mail .itens .titulo-email .campo textarea').addEventListener('keydown', () => {
    document.querySelector('#e-mail .preview .conteudo h2').textContent = document.querySelector('#e-mail .itens .titulo-email .campo textarea').value;
});

document.querySelector('#e-mail .itens .titulo-email .campo textarea').addEventListener('keyup', () => {
    document.querySelector('#e-mail .preview .conteudo h2').textContent = document.querySelector('#e-mail .itens .titulo-email .campo textarea').value;
});

document.querySelector('#e-mail-botoes .salvar').addEventListener('click', async () => {
    let lista = [];

    let elementos = document.querySelectorAll('#e-mail .itens .item');

    for (let e of elementos) {
        if (e.classList.contains('titulo-email')) {
            if (e.querySelector('textarea').value == '') {
                abrirStatusModal(false, 'O título do e-mail não pode estar vazio.');

                return;
            }

            continue;
        }

        if (e.classList.contains('paragrafo')) {
            if (e.querySelector('textarea').value == '') {
                abrirStatusModal(false, 'Nenhum parágrafo pode estar vazio.');

                return;
            }

            lista.push({
                tipo: 'paragrafo',
                conteudo: e.querySelector('textarea').value
            });
        }

        if (e.classList.contains('imagem')) {
            if (e.querySelector('img').src == '') {
                abrirStatusModal(false, 'Há imagens para selecionar.');

                return;
            }

            lista.push({
                tipo: 'imagem',
                conteudo: e.querySelector('img').src
            });
        }
    }
    
    let resposta = await fetch('/api/e-mail', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id,
            titulo: document.querySelector('#e-mail .itens .titulo-email .campo textarea').value,
            conteudo: lista
        })
    });

    let respostaJSON = await resposta.json();

    if (!respostaJSON.ok) {
        abrirStatusModal(false, respostaJSON.mensagem);
        return;
    } 

    abrirStatusModal(true, 'E-mail salvo.')
});

document.querySelector('#e-mail-botoes .enviar').addEventListener('click', async () => {
    abrirModalConfirmar('Aviso', 'O e-mail será salvo e enviado. Deseja enviar o e-mail?', async () => {
        let lista = [];

        let elementos = document.querySelectorAll('#e-mail .itens .item');

        for (let e of elementos) {
            if (e.classList.contains('titulo-email')) {
                if (e.querySelector('textarea').value == '') {
                    abrirStatusModal(false, 'O título do e-mail não pode estar vazio.');

                    return;
                }

                continue;
            }

            if (e.classList.contains('paragrafo')) {
                if (e.querySelector('textarea').value == '') {
                    abrirStatusModal(false, 'Nenhum parágrafo pode estar vazio.');

                    return;
                }

                lista.push({
                    tipo: 'paragrafo',
                    conteudo: e.querySelector('textarea').value
                });
            }

            if (e.classList.contains('imagem')) {
                if (e.querySelector('img').src == '') {
                    abrirStatusModal(false, 'Há imagens para selecionar.');

                    return;
                }

                lista.push({
                    tipo: 'imagem',
                    conteudo: e.querySelector('img').src
                });
            }
        }

        let resposta = await fetch('/api/e-mail', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id,
                titulo: document.querySelector('#e-mail .itens .titulo-email .campo textarea').value,
                conteudo: lista
            })
        });
    
        let respostaJSON = await resposta.json();
    
        if (!respostaJSON.ok) {
            abrirStatusModal(false, respostaJSON.mensagem);
            return;
        } 

        resposta = await fetch('/api/e-mail/enviar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: id
            })
        });
    
        respostaJSON = await resposta.json();
    
        if (!respostaJSON.ok) {
            abrirStatusModal(false, respostaJSON.mensagem);
            return;
        }
        
        window.location.reload();
    });
});