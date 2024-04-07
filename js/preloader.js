window.addEventListener("AllPageContentLoaded", () => {
    const preloader = document.getElementById("preloader");
    preloader.classList.add("preloader-hidden");
    preloader.addEventListener("transitioned", () => {
        document.body.removeChild(preloader);
    })
})