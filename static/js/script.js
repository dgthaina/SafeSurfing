window.addEventListener("scroll", () => {
    var navbar2 = document.getElementById("navbar");
    if (window.scrollY > 0) {
        navbar2.style.background = "linear-gradient(135deg, rgb(222, 149, 120), rgb(230, 182, 119), rgb(222, 149, 120))";
    } else {
        navbar2.style.background = "transparent";
    }
});
