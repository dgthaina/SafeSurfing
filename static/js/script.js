// Controle de estilo da barra de navegação

window.addEventListener("scroll", () => {
    var navbar2 = document.querySelector("#navbar .nav-fundo");
    if (window.scrollY > 0) {
        navbar2.style.opacity = "1";
    } else {
        navbar2.style.opacity = "0";
    }
});

function fecharNav() {
    document.querySelector('#navbar .nav-real ul').style.maxHeight = '0em';
    document.querySelector('#navbar .nav-real ul').style.paddingBlock = '0em';
}

function abrirNav() {
    document.querySelector('#navbar .nav-real ul').style.maxHeight = '10em';
    document.querySelector('#navbar .nav-real ul').style.paddingBlock = '0.75em';

}

function atualizarNav() {
    if (navStatus) {
        abrirNav();
        return;
    }
    fecharNav();
}

let navStatus = false;

window.addEventListener("load", () => {
    if (window.innerWidth < 500) {
        atualizarNav();
        return;
    }

    abrirNav();
});

window.addEventListener("resize", () => {
    if (window.innerWidth < 500) {
        atualizarNav();
        return;
    }

    abrirNav();
});

document.querySelector('#hamburguer').addEventListener('click', () => {
    navStatus = !navStatus;
    atualizarNav();
});

// Controle da revelação de seções

var t = window.scrollY;

window.onscroll = () => {
    document.querySelectorAll('.reveal').forEach(e => {
        if (e.getBoundingClientRect().top < window.innerHeight - 150) {
            e.classList.add('active');
        } else {
            e.classList.remove('active');
        }
    });
}

// Controle de cards em Recursos

let recursoAtual = 0;
let recursoMaximo = document.querySelector('#recursos .colecao-cards').children.length;

function trocarRecurso(deslocamento) {
    if ((recursoAtual + deslocamento < 0) || (recursoAtual + deslocamento >= recursoMaximo)) {
        return;
    }

    let deslocamentoTransformAtual = -recursoAtual * 200;
    let deslocamentoTransform = deslocamento * 200;

    recursoAtual += deslocamento;

    document.querySelectorAll('#recursos .card').forEach(element => {
        element.style.transform = `translate(${deslocamentoTransformAtual - deslocamentoTransform}%)`;
    });
    
}

document.querySelectorAll('#carrossel .tras').forEach(e => {
    e.addEventListener('click', () => {
        trocarRecurso(-1)
    })
})

document.querySelectorAll('#carrossel .frente').forEach(e => {
    e.addEventListener('click', () => {
        trocarRecurso(1)
    })
})

// Modal

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

// Mudança do título do estatuto

window.addEventListener('resize', () => {
    if (window.innerWidth < 310) {
        document.querySelector('#estatuto h2 span').innerText = 'ECA';
        return;
    }

    document.querySelector('#estatuto h2 span').innerText = 'Estatuto da Criança e do Adolescente';
});