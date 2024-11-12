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