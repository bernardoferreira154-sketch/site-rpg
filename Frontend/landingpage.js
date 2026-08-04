const elements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target); // anima só 1x, nunca mais dispara
        }
    });
});

elements.forEach((element) => observer.observe(element));






document.querySelector(".logo").addEventListener("click", () => {
    document.querySelectorAll(".hidden").forEach(e => {
        e.classList.remove("hidden");
    });
    document.querySelectorAll(".login, .signup").forEach(e => {
        e.classList.add("hidden")
    })

});



function mostrarPagina(el) {
    el.classList.remove("hidden");
    el.classList.remove("active");
    void el.offsetWidth; // força o navegador a "esquecer" o estado anterior
    el.classList.add("active");
}

document.querySelector(".sign_up").addEventListener("click", () => {
    document.querySelector(".landingpage")?.classList.add("hidden");
    document.querySelector(".login")?.classList.add("hidden");
    mostrarPagina(document.querySelector(".signup"));
});

document.querySelector(".log_in").addEventListener("click", () => {
    document.querySelector(".landingpage")?.classList.add("hidden");
    document.querySelector(".signup")?.classList.add("hidden");
    mostrarPagina(document.querySelector(".login"));
});

const inputEmail = document.querySelector(".e-mail");
const inputPassword = document.querySelector(".pswrd");
const btnGoogle = document.querySelector(".SignUpWGoogle");

const addClassBtnGoogle = () => { document.querySelector(".SignUpWGoogle").classList.add("sobreselecionado");}
const removeClassBtnGoogle = () => { document.querySelector(".SignUpWGoogle").classList.remove("sobreselecionado");}

inputEmail.addEventListener('focus', addClassBtnGoogle);
inputEmail.addEventListener('blur', removeClassBtnGoogle);

inputPassword.addEventListener('focus', addClassBtnGoogle);
inputPassword.addEventListener('blur', removeClassBtnGoogle);