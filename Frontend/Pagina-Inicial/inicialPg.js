
// =========================================
// ARCHIVUM — LÓGICA DA LIVRARIA
// =========================================

const livros = [
    {
        id: "mestre",
        nome: "Livro do Mestre",
        categoria: "regras",
        preco: 149.90,
        imagem: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=500&q=85"
    },
    {
        id: "grimorio",
        nome: "Grimório Arcano",
        categoria: "regras",
        preco: 89.90,
        imagem: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=500&q=85"
    },
    {
        id: "bestiario",
        nome: "Bestiário das Sombras",
        categoria: "bestiarios",
        preco: 119.90,
        imagem: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=500&q=85"
    },
    {
        id: "cripta",
        nome: "A Cripta Esquecida",
        categoria: "aventuras",
        preco: 69.90,
        imagem: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=500&q=85"
    },
    {
        id: "reinos",
        nome: "Reinos Perdidos",
        categoria: "aventuras",
        preco: 79.90,
        imagem: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=500&q=85"
    },
    {
        id: "herois",
        nome: "Crônicas dos Heróis",
        categoria: "regras",
        preco: 99.90,
        imagem: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=500&q=85"
    },
    {
        id: "dragao",
        nome: "Anatomia do Dragão",
        categoria: "bestiarios",
        preco: 109.90,
        imagem: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=500&q=85"
    }
];

// =========================================
// ELEMENTOS DO HTML
// =========================================

const buscaLivros = document.getElementById("buscaLivros");
const gradeCatalogo = document.getElementById("gradeCatalogo");
const quantidadeLivros = document.getElementById("quantidadeLivros");
const mensagemVazia = document.getElementById("mensagemVazia");
const ordenarLivros = document.getElementById("ordenarLivros");

const abrirCarrinho = document.getElementById("abrirCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");
const painelCarrinho = document.getElementById("painelCarrinho");
const fundoPainel = document.getElementById("fundoPainel");

const contadorCarrinho = document.getElementById("contadorCarrinho");
const itensCarrinho = document.getElementById("itensCarrinho");
const totalCarrinho = document.getElementById("totalCarrinho");
const finalizarCompra = document.getElementById("finalizarCompra");

const botaoMenu = document.getElementById("botaoMenu");
const navPrincipal = document.querySelector(".nav-principal");

const botaoPerfil = document.getElementById("botaoPerfil");
const modalPerfil = document.getElementById("modalPerfil");
const fecharPerfil = document.getElementById("fecharPerfil");
const entendiPerfil = document.getElementById("entendiPerfil");

const notificacao = document.getElementById("notificacao");

// =========================================
// ESTADO DA APLICAÇÃO
// =========================================

// Categoria que o usuário selecionou.
let categoriaSelecionada = "todos";

// Guarda os livros e suas respectivas quantidades.
const carrinho = new Map();

// Guarda os IDs dos livros favoritados.
const favoritos = new Set();

let temporizadorNotificacao;

// =========================================
// FUNÇÕES AUXILIARES
// =========================================

// Formata números como preços em reais.
function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Encontra um livro pelo seu ID.
function encontrarLivro(id) {
    return livros.find(livro => livro.id === id);
}

// Exibe uma mensagem temporária na tela.
function mostrarNotificacao(mensagem) {
    clearTimeout(temporizadorNotificacao);

    notificacao.textContent = mensagem;
    notificacao.classList.add("visivel");

    temporizadorNotificacao = setTimeout(() => {
        notificacao.classList.remove("visivel");
    }, 2600);
}

// =========================================
// BUSCA, FILTROS E ORDENAÇÃO
// =========================================

function atualizarCatalogo() {
    const termo = buscaLivros.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    // Seleciona os livros que correspondem à busca
    // e à categoria atual.
    let resultado = livros.filter(livro => {
        const correspondeNome = livro.nome
            .toLocaleLowerCase("pt-BR")
            .includes(termo);

        const correspondeCategoria =
            categoriaSelecionada === "todos" ||
            livro.categoria === categoriaSelecionada;

        return correspondeNome && correspondeCategoria;
    });

    // Ordena o resultado conforme a opção escolhida.
    switch (ordenarLivros.value) {
        case "menor-preco":
            resultado.sort((a, b) => a.preco - b.preco);
            break;

        case "maior-preco":
            resultado.sort((a, b) => b.preco - a.preco);
            break;

        case "nome":
            resultado.sort((a, b) =>
                a.nome.localeCompare(b.nome, "pt-BR")
            );
            break;

        case "padrao":
        default:
            resultado.sort(
                (a, b) => livros.indexOf(a) - livros.indexOf(b)
            );
            break;
    }

    // Esconde todos os cards antes de mostrar os resultados.
    const cards = gradeCatalogo.querySelectorAll(".card-livro");

    cards.forEach(card => {
        card.hidden = true;
    });

    // Mostra somente os livros encontrados.
    resultado.forEach(livro => {
        const card = gradeCatalogo.querySelector(
            `.card-livro[data-id="${livro.id}"]`
        );

        if (card) {
            card.hidden = false;
        }
    });

    // Atualiza o contador de resultados.
    const total = resultado.length;

    quantidadeLivros.textContent =
        `${total} ${total === 1 ? "obra encontrada" : "obras encontradas"}`;

    // Se nada foi encontrado, exibe uma mensagem.
    mensagemVazia.hidden = total !== 0;
}

// Atualiza a busca enquanto o usuário digita.
buscaLivros.addEventListener("input", atualizarCatalogo);

// Atualiza a ordem dos livros.
ordenarLivros.addEventListener("change", atualizarCatalogo);

// Os botões de categoria da seção de categorias.
document.querySelectorAll(".card-categoria").forEach(botao => {
    botao.addEventListener("click", () => {
        categoriaSelecionada = botao.dataset.categoria;

        atualizarEstadoFiltros();

        document.getElementById("catalogo").scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        atualizarCatalogo();
    });
});

// Os botões de filtro do catálogo.
document.querySelectorAll(".filtro").forEach(botao => {
    botao.addEventListener("click", () => {
        categoriaSelecionada = botao.dataset.filtro;

        atualizarEstadoFiltros();
        atualizarCatalogo();
    });
});

// Mantém os dois grupos de botões sincronizados.
function atualizarEstadoFiltros() {
    document.querySelectorAll(".filtro").forEach(botao => {
        const selecionado =
            botao.dataset.filtro === categoriaSelecionada;

        botao.classList.toggle("ativo", selecionado);
    });

    document.querySelectorAll(".card-categoria").forEach(botao => {
        const selecionado =
            botao.dataset.categoria === categoriaSelecionada;

        botao.classList.toggle("selecionada", selecionado);
    });
}

// A tecla "/" leva o usuário à busca.
document.addEventListener("keydown", evento => {
    if (
        evento.key === "/" &&
        !evento.ctrlKey &&
        !evento.metaKey &&
        !evento.altKey &&
        !["INPUT", "TEXTAREA", "SELECT"].includes(
            document.activeElement.tagName
        )
    ) {
        evento.preventDefault();
        buscaLivros.focus();
    }
});

// =========================================
// FAVORITOS
// =========================================

document.querySelectorAll(".botao-favorito").forEach(botao => {
    botao.addEventListener("click", () => {
        const card = botao.closest(".card-livro");

        if (!card) return;

        const titulo = card.querySelector("h3")?.textContent;
        const id = card.dataset.id ||
            livros.find(livro => livro.nome === titulo)?.id;

        if (!id) return;

        const icone = botao.querySelector("i");

        if (favoritos.has(id)) {
            favoritos.delete(id);

            botao.classList.remove("favoritado");
            botao.setAttribute("aria-pressed", "false");

            icone.classList.remove("fa-solid");
            icone.classList.add("fa-regular");

            mostrarNotificacao("Livro removido dos favoritos.");
        } else {
            favoritos.add(id);

            botao.classList.add("favoritado");
            botao.setAttribute("aria-pressed", "true");

            icone.classList.remove("fa-regular");
            icone.classList.add("fa-solid");

            mostrarNotificacao("Livro adicionado aos favoritos.");
        }
    });
});

// =========================================
// CARRINHO DE COMPRAS
// =========================================

// Adiciona um livro ao carrinho.
function adicionarAoCarrinho(id) {
    const livro = encontrarLivro(id);

    if (!livro) return;

    if (carrinho.has(id)) {
        const item = carrinho.get(id);
        item.quantidade++;
    } else {
        carrinho.set(id, {
            livro: livro,
            quantidade: 1
        });
    }

    atualizarCarrinho();

    mostrarNotificacao(`${livro.nome} adicionado ao carrinho.`);
}

// Todos os botões de adicionar livro.
document.querySelectorAll(".botao-adicionar").forEach(botao => {
    botao.addEventListener("click", () => {
        adicionarAoCarrinho(botao.dataset.id);
    });
});

// Calcula quantas unidades existem no carrinho.
function calcularQuantidadeTotal() {
    let quantidade = 0;

    carrinho.forEach(item => {
        quantidade += item.quantidade;
    });

    return quantidade;
}

// Calcula o preço total de todos os itens.
function calcularValorTotal() {
    let total = 0;

    carrinho.forEach(item => {
        total += item.livro.preco * item.quantidade;
    });

    return total;
}

// Atualiza contador, itens e preços.
function atualizarCarrinho() {
    contadorCarrinho.textContent = calcularQuantidadeTotal();

    totalCarrinho.textContent = formatarPreco(calcularValorTotal());

    // Se não há itens, mostra a mensagem de carrinho vazio.
    if (carrinho.size === 0) {
        itensCarrinho.innerHTML = `
            <div class="carrinho-vazio">
                <i class="fa-solid fa-book-open" aria-hidden="true"></i>
                <p>Seu carrinho ainda está vazio.</p>
                <span>Que tal encontrar uma nova aventura?</span>
            </div>
        `;

        return;
    }

    // Cria um card para cada livro no carrinho.
    itensCarrinho.innerHTML = "";

    carrinho.forEach((item, id) => {
        const livro = item.livro;

        const artigo = document.createElement("article");
        artigo.className = "item-carrinho";

        const imagem = document.createElement("img");
        imagem.src = livro.imagem;
        imagem.alt = `Capa ilustrativa de ${livro.nome}`;
        imagem.loading = "lazy";

        const dados = document.createElement("div");
        dados.className = "dados-item";

        const titulo = document.createElement("h3");
        titulo.textContent = livro.nome;

        const preco = document.createElement("span");
        preco.textContent = formatarPreco(
            livro.preco * item.quantidade
        );

        const controles = document.createElement("div");
        controles.className = "controles-quantidade";

        const diminuir = document.createElement("button");
        diminuir.type = "button";
        diminuir.textContent = "−";
        diminuir.setAttribute("aria-label", `Diminuir quantidade de ${livro.nome}`);

        const quantidade = document.createElement("span");
        quantidade.textContent = item.quantidade;

        const aumentar = document.createElement("button");
        aumentar.type = "button";
        aumentar.textContent = "+";
        aumentar.setAttribute("aria-label", `Aumentar quantidade de ${livro.nome}`);

        diminuir.addEventListener("click", () => {
            alterarQuantidade(id, -1);
        });

        aumentar.addEventListener("click", () => {
            alterarQuantidade(id, 1);
        });

        controles.append(diminuir, quantidade, aumentar);
        dados.append(titulo, preco, controles);

        const remover = document.createElement("button");
        remover.type = "button";
        remover.className = "remover-item";
        remover.setAttribute("aria-label", `Remover ${livro.nome} do carrinho`);

        const iconeRemover = document.createElement("i");
        iconeRemover.className = "fa-solid fa-trash";
        iconeRemover.setAttribute("aria-hidden", "true");

        remover.appendChild(iconeRemover);

        remover.addEventListener("click", () => {
            carrinho.delete(id);
            atualizarCarrinho();

            mostrarNotificacao(`${livro.nome} removido do carrinho.`);
        });

        artigo.append(imagem, dados, remover);

        itensCarrinho.appendChild(artigo);
    });
}

// Altera a quantidade de um item.
function alterarQuantidade(id, variacao) {
    const item = carrinho.get(id);

    if (!item) return;

    item.quantidade += variacao;

    // Remove o item se a quantidade chegar a zero.
    if (item.quantidade <= 0) {
        carrinho.delete(id);
    }

    atualizarCarrinho();
}

// =========================================
// ABRIR E FECHAR CARRINHO
// =========================================

function abrirPainelCarrinho() {
    fundoPainel.hidden = false;

    painelCarrinho.inert = false;
    painelCarrinho.setAttribute("aria-hidden", "false");

    abrirCarrinho.setAttribute("aria-expanded", "true");

    document.body.classList.add("painel-aberto");

    requestAnimationFrame(() => {
        painelCarrinho.classList.add("aberto");
        fecharCarrinho.focus();
    });
}

function fecharPainelCarrinho() {
    painelCarrinho.classList.remove("aberto");

    painelCarrinho.inert = true;
    painelCarrinho.setAttribute("aria-hidden", "true");

    abrirCarrinho.setAttribute("aria-expanded", "false");

    document.body.classList.remove("painel-aberto");

    // Aguarda a animação antes de esconder o fundo.
    setTimeout(() => {
        if (!painelCarrinho.classList.contains("aberto")) {
            fundoPainel.hidden = true;
        }
    }, 300);

    abrirCarrinho.focus();
}

abrirCarrinho.addEventListener("click", abrirPainelCarrinho);
fecharCarrinho.addEventListener("click", fecharPainelCarrinho);

fundoPainel.addEventListener("click", fecharPainelCarrinho);

// Fecha o carrinho ao apertar Escape.
document.addEventListener("keydown", evento => {
    if (evento.key === "Escape") {
        if (painelCarrinho.classList.contains("aberto")) {
            fecharPainelCarrinho();
        }

        if (!modalPerfil.hidden) {
            fecharModalPerfil();
        }
    }
});

// =========================================
// FINALIZAÇÃO DEMONSTRATIVA
// =========================================

finalizarCompra.addEventListener("click", () => {
    if (carrinho.size === 0) {
        mostrarNotificacao("Adicione pelo menos um livro antes de continuar.");
        return;
    }

    mostrarNotificacao(
        "Carrinho pronto! O checkout precisa ser conectado a um sistema de pagamentos."
    );
});

// =========================================
// MENU PARA CELULARES
// =========================================

botaoMenu.addEventListener("click", () => {
    const aberto = navPrincipal.classList.toggle("menu-aberto");

    botaoMenu.setAttribute("aria-expanded", String(aberto));

    botaoMenu.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    const icone = botaoMenu.querySelector("i");

    icone.classList.toggle("fa-bars", !aberto);
    icone.classList.toggle("fa-xmark", aberto);
});

// Fecha o menu quando um link é selecionado.
navPrincipal.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
        navPrincipal.classList.remove("menu-aberto");

        botaoMenu.setAttribute("aria-expanded", "false");
        botaoMenu.setAttribute("aria-label", "Abrir menu");

        const icone = botaoMenu.querySelector("i");

        icone.classList.add("fa-bars");
        icone.classList.remove("fa-xmark");
    });
});

// =========================================
// PERFIL
// =========================================

function abrirModalPerfil() {
    modalPerfil.hidden = false;
    fecharPerfil.focus();
}

function fecharModalPerfil() {
    modalPerfil.hidden = true;
    botaoPerfil.focus();
}

botaoPerfil.addEventListener("click", abrirModalPerfil);
fecharPerfil.addEventListener("click", fecharModalPerfil);
entendiPerfil.addEventListener("click", fecharModalPerfil);

// Fecha o modal se o usuário clicar fora do conteúdo.
modalPerfil.addEventListener("click", evento => {
    if (evento.target === modalPerfil) {
        fecharModalPerfil();
    }
});

// =========================================
// NAVEGAÇÃO ATIVA
// =========================================

const linksNavegacao = document.querySelectorAll(".nav-link");

linksNavegacao.forEach(link => {
    link.addEventListener("click", () => {
        linksNavegacao.forEach(outroLink => {
            outroLink.classList.remove("ativo");
        });

        link.classList.add("ativo");
    });
});

// =========================================
// INICIALIZAÇÃO
// =========================================

atualizarCatalogo();
atualizarCarrinho();