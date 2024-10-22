window.addEventListener("scroll", () => {
    var navbar2 = document.getElementById("navbar");
    if (window.scrollY > 0) {
        navbar2.style.backgroundColor = "rgb(230, 182, 119)";
    } else {
        navbar2.style.backgroundColor = "transparent";
    }
});

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