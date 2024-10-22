

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

document.querySelector('#carrossel .tras').addEventListener('click', () => {
    trocarRecurso(-1)
});

document.querySelector('#carrossel .frente').addEventListener('click', () => {
    trocarRecurso(1)
});