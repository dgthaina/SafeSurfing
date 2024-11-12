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
