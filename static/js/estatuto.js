window.addEventListener('resize', () => {
    if (window.innerWidth < 310) {
        document.querySelector('#estatuto h2 span').innerText = 'ECA';
        return;
    }

    document.querySelector('#estatuto h2 span').innerText = 'Estatuto da Criança e do Adolescente';
});