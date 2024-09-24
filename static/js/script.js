let index = 0;

function moveCarrossel(direction) {
    const carrossel = document.getElementById('carrossel');
    const cards = carrossel.querySelectorAll('.card');
    index += direction;

    if (index < 0) {
        index = cards.length - 1;
    } else if (index >= cards.length) {
        index = 0;
    }

    carrossel.style.transform = `translateX(${-index * 100}%)`;
}
