// =============================================
// ARCHIVUM — LANDING PAGE
// =============================================

// Elementos principais
const paginaInicial = document.getElementById("paginaInicial");
const paginaLogin = document.getElementById("paginaLogin");
const paginaCadastro = document.getElementById("paginaCadastro");

const menuMobile = document.getElementById("menuMobile");
const navegacao = document.getElementById("navegacao");

const mensagemFeedback = document.getElementById("mensagemFeedback");

let temporizadorFeedback;


// =============================================
// MENSAGENS
// =============================================

function mostrarFeedback(mensagem) {
    clearTimeout(temporizadorFeedback);

    mensagemFeedback.textContent = mensagem;
    mensagemFeedback.classList.add("visivel");

    temporizadorFeedback = setTimeout(() => {
        mensagemFeedback.classList.remove("visivel");
    }, 3500);
}


// =============================================
// NAVEGAÇÃO ENTRE AS PÁGINAS
// =============================================

function mostrarInicio() {
    document.body.classList.remove("auth-mode");

    paginaInicial.classList.remove("hidden");
    paginaLogin.classList.add("hidden");
    paginaCadastro.classList.add("hidden");

    fecharMenuMobile();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function mostrarLogin() {
    document.body.classList.add("auth-mode");

    paginaInicial.classList.add("hidden");
    paginaLogin.classList.remove("hidden");
    paginaCadastro.classList.add("hidden");

    fecharMenuMobile();

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    document.getElementById("loginEmail").focus();
}

function mostrarCadastro() {
    document.body.classList.add("auth-mode");

    paginaInicial.classList.add("hidden");
    paginaLogin.classList.add("hidden");
    paginaCadastro.classList.remove("hidden");

    fecharMenuMobile();

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

    document.getElementById("cadastroNome").focus();
}


// Botão de login do cabeçalho.
document.querySelector(".navbar .log_in")
    .addEventListener("click", mostrarLogin);


// Botão de cadastro do cabeçalho.
document.querySelector(".navbar .sign_up")
    .addEventListener("click", mostrarCadastro);


// Botão principal da seção "Como funciona".
document.querySelector(".botao-comecar")
    .addEventListener("click", mostrarCadastro);


// Botão da chamada final.
document.querySelector(".chamada-botao")
    .addEventListener("click", mostrarCadastro);


// O botão principal do hero leva à seção sobre o produto.
document.querySelector(".hero-cta")
    .addEventListener("click", () => {
        document.getElementById("sobre").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });


// Voltar para a landing page a partir das telas de autenticação.
document.querySelectorAll(".auth-voltar").forEach(botao => {
    botao.addEventListener("click", mostrarInicio);
});


// Alternar entre login e cadastro.
document.querySelector(".ir-cadastro")
    .addEventListener("click", mostrarCadastro);

document.querySelector(".ir-login")
    .addEventListener("click", mostrarLogin);


// Os logotipos retornam à página inicial.
document.querySelectorAll(".logo").forEach(logo => {
    logo.addEventListener("click", evento => {
        evento.preventDefault();
        mostrarInicio();
    });
});


// =============================================
// MENU PARA CELULARES
// =============================================

function fecharMenuMobile() {
    navegacao.classList.remove("menu-aberto");

    menuMobile.setAttribute("aria-expanded", "false");
    menuMobile.setAttribute("aria-label", "Abrir menu");

    const icone = menuMobile.querySelector("i");

    icone.classList.remove("fa-xmark");
    icone.classList.add("fa-bars");
}

menuMobile.addEventListener("click", () => {
    const aberto = navegacao.classList.toggle("menu-aberto");

    menuMobile.setAttribute("aria-expanded", String(aberto));

    menuMobile.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    const icone = menuMobile.querySelector("i");

    icone.classList.toggle("fa-bars", !aberto);
    icone.classList.toggle("fa-xmark", aberto);
});


// Fecha o menu quando um link é selecionado.
navegacao.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", fecharMenuMobile);
});


// Fecha o menu se o usuário clicar fora dele.
document.addEventListener("click", evento => {
    const clicouNoMenu = navegacao.contains(evento.target);
    const clicouNoBotao = menuMobile.contains(evento.target);

    if (!clicouNoMenu && !clicouNoBotao) {
        fecharMenuMobile();
    }
});


// =============================================
// ANIMAÇÕES AO ROLAR A PÁGINA
// =============================================

const elementosReveal = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver((entradas, observer) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("active");

                // A animação não precisa ser repetida.
                observer.unobserve(entrada.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
    });

    elementosReveal.forEach(elemento => {
        observador.observe(elemento);
    });
} else {
    // Alternativa para navegadores sem IntersectionObserver.
    elementosReveal.forEach(elemento => {
        elemento.classList.add("active");
    });
}


// =============================================
// LOGIN — DEMONSTRAÇÃO VISUAL
// =============================================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", evento => {
    evento.preventDefault();

    if (!loginForm.reportValidity()) {
        return;
    }

    mostrarFeedback(
        "A interface de login está pronta, mas a autenticação ainda precisa ser conectada ao backend."
    );
});


// =============================================
// CADASTRO — DEMONSTRAÇÃO VISUAL
// =============================================

const cadastroForm = document.getElementById("cadastroForm");

cadastroForm.addEventListener("submit", evento => {
    evento.preventDefault();

    if (!cadastroForm.reportValidity()) {
        return;
    }

    const senha = document.getElementById("cadastroPassword").value;

    if (senha.length < 8) {
        mostrarFeedback("A senha precisa ter pelo menos 8 caracteres.");
        return;
    }

    mostrarFeedback(
        "A interface de cadastro está pronta, mas a criação de contas ainda precisa ser conectada ao backend."
    );
});


// =============================================
// LINKS QUE AINDA NÃO POSSUEM DESTINO
// =============================================

// Evita que links internos sem uma seção correspondente
// levem o usuário para o topo da página.
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener("click", evento => {
        evento.preventDefault();
    });
});


// =============================================
// ANO AUTOMÁTICO NO RODAPÉ
// =============================================

document.getElementById("anoAtual").textContent =
    new Date().getFullYear();


// =============================================
// INICIALIZAÇÃO
// =============================================

fecharMenuMobile();

document.body.classList.remove("auth-mode");

paginaInicial.classList.remove("hidden");
paginaLogin.classList.add("hidden");
paginaCadastro.classList.add("hidden");


/* Entrar na página principal sem verificar o backend */

document.querySelectorAll(".auth-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        window.location.href = "Pagina-Inicial/inicialPg.html";
    });
});
