/* =========================================================
   ARMOIRE CENTRAL
   PRODUTO.JS
   Página individual do produto
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRODUTO ATUAL
    ===================================================== */

    const parametros = new URLSearchParams(
        window.location.search
    );

    const idProduto = parametros.get("id");


    if (
        !idProduto ||
        typeof produtos === "undefined" ||
        !produtos[idProduto]
    ) {

        console.error(
            "Produto não encontrado:",
            idProduto
        );

        return;
    }


    const produto = produtos[idProduto];


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const marcaProduto =
        document.getElementById("marcaProduto");

    const nomeProduto =
        document.getElementById("nomeProduto");

    const breadcrumbProduto =
        document.getElementById("breadcrumbProduto");

    const precoProduto =
        document.getElementById("precoProduto");

    const parcelamentoProduto =
        document.getElementById("parcelamentoProduto");

    const imagemPrincipal =
        document.getElementById("imagemPrincipal");

    const miniaturas =
        document.getElementById("miniaturas");

    const coresProduto =
        document.getElementById("coresProduto");

    const corSelecionada =
        document.getElementById("corSelecionada");

    const tamanhosProduto =
        document.getElementById("tamanhosProduto");

    const tamanhoSelecionado =
        document.getElementById("tamanhoSelecionado");

    const quantidadeProduto =
        document.getElementById("quantidadeProduto");

    const descricaoProduto =
        document.getElementById("descricaoProduto");

    const composicaoProduto =
        document.getElementById("composicaoProduto");

    const produtosRelacionados =
        document.getElementById("produtosRelacionados");

    const btnComprar =
        document.getElementById("btnComprar");

    const diminuirQuantidade =
        document.getElementById("diminuirQuantidade");

    const aumentarQuantidade =
        document.getElementById("aumentarQuantidade");


    /* =====================================================
       PREÇO
    ===================================================== */

    function formatarPreco(valor) {

        return Number(valor || 0).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

    }


    /* =====================================================
       INFORMAÇÕES
    ===================================================== */

    function carregarInformacoes() {

        if (marcaProduto) {

            marcaProduto.textContent =
                produto.marca || "ARMOIRE CENTRAL";

        }


        if (nomeProduto) {

            nomeProduto.textContent =
                produto.nome || "Produto";

        }


        if (breadcrumbProduto) {

            breadcrumbProduto.textContent =
                produto.nome || "Produto";

        }


        if (precoProduto) {

            precoProduto.textContent =
                formatarPreco(produto.preco);

        }


        if (parcelamentoProduto) {

            parcelamentoProduto.textContent =
                produto.parcelamento || "";

        }


        if (descricaoProduto) {

            descricaoProduto.textContent =
                produto.descricao || "";

        }


        document.title =
            `${produto.nome} | Armoire Central`;

    }


    carregarInformacoes();


    /* =====================================================
       GALERIA
    ===================================================== */

    function carregarGaleria() {

        if (!imagemPrincipal || !miniaturas) {
            return;
        }


        const imagens =
            Array.isArray(produto.imagens)
                ? produto.imagens
                : [];


        miniaturas.innerHTML = "";


        if (imagens.length === 0) {

            imagemPrincipal.removeAttribute("src");

            return;

        }


        imagemPrincipal.src =
            imagens[0];

        imagemPrincipal.alt =
            produto.nome;


        imagens.forEach((imagem, index) => {

            const miniatura =
                document.createElement("img");


            miniatura.src =
                imagem;


            miniatura.alt =
                `${produto.nome} ${index + 1}`;


            miniatura.className =
                index === 0
                    ? "ativa"
                    : "";


            miniatura.addEventListener(
                "click",
                () => {

                    trocarImagem(
                        imagem,
                        miniatura
                    );

                }
            );


            miniaturas.appendChild(
                miniatura
            );

        });

    }


    /* =====================================================
       TROCA DE IMAGEM
    ===================================================== */

    function trocarImagem(
        imagem,
        miniatura
    ) {

        if (!imagemPrincipal) {
            return;
        }


        imagemPrincipal.classList.remove(
            "troca-imagem"
        );


        void imagemPrincipal.offsetWidth;


        imagemPrincipal.classList.add(
            "troca-imagem"
        );


        setTimeout(() => {

            imagemPrincipal.src =
                imagem;

            imagemPrincipal.classList.remove(
                "troca-imagem"
            );

        }, 180);


        document
            .querySelectorAll(
                "#miniaturas img"
            )
            .forEach(img => {

                img.classList.remove(
                    "ativa"
                );

            });


        miniatura.classList.add(
            "ativa"
        );

    }


    carregarGaleria();


    /* =====================================================
       CORES
    ===================================================== */

    function carregarCores() {

        if (!coresProduto) {
            return;
        }


        coresProduto.innerHTML = "";


        const cores =
            Array.isArray(produto.cores)
                ? produto.cores
                : [];


        if (cores.length === 0) {

            return;

        }


        cores.forEach(
            (cor, index) => {

                const botao =
                    document.createElement(
                        "button"
                    );


                botao.type =
                    "button";


                botao.className =
                    "btn-cor";


                botao.setAttribute(
                    "aria-label",
                    cor.nome
                );


                /*
                   Cria a aparência da cor.
                */

                botao.style.setProperty(
                    "--cor-produto",
                    cor.codigo || "#111"
                );


                /*
                   Nome da cor.
                */

                const nome =
                    document.createElement(
                        "span"
                    );


                nome.className =
                    "nome-cor";


                nome.textContent =
                    cor.nome;


                botao.appendChild(
                    nome
                );


                /*
                   Primeira cor selecionada.
                */

                if (index === 0) {

                    botao.classList.add(
                        "ativo"
                    );


                    if (corSelecionada) {

                        corSelecionada.textContent =
                            cor.nome;

                    }

                }


                botao.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(
                                "#coresProduto .btn-cor"
                            )
                            .forEach(
                                outro => {

                                    outro.classList.remove(
                                        "ativo"
                                    );

                                }
                            );


                        botao.classList.add(
                            "ativo"
                        );


                        if (corSelecionada) {

                            corSelecionada.textContent =
                                cor.nome;

                        }

                    }
                );


                coresProduto.appendChild(
                    botao
                );

            }
        );

    }


    carregarCores();


    /* =====================================================
       TAMANHOS
    ===================================================== */

    function carregarTamanhos() {

        if (!tamanhosProduto) {
            return;
        }


        tamanhosProduto.innerHTML =
            "";


        const tamanhos =
            Array.isArray(produto.tamanhos)
                ? produto.tamanhos
                : [];


        if (tamanhos.length === 0) {
            return;
        }


        tamanhos.forEach(
            tamanho => {

                const botao =
                    document.createElement(
                        "button"
                    );


                botao.type =
                    "button";


                botao.className =
                    "btn-tamanho";


                botao.textContent =
                    tamanho;


                botao.addEventListener(
                    "click",
                    () => {

                        document
                            .querySelectorAll(
                                "#tamanhosProduto .btn-tamanho"
                            )
                            .forEach(
                                outro => {

                                    outro.classList.remove(
                                        "ativo"
                                    );

                                }
                            );


                        botao.classList.add(
                            "ativo"
                        );


                        if (
                            tamanhoSelecionado
                        ) {

                            tamanhoSelecionado.textContent =
                                tamanho;

                        }

                    }
                );


                tamanhosProduto.appendChild(
                    botao
                );

            }
        );


        /*
           Tamanho único é selecionado
           automaticamente.
        */

        if (
            tamanhos.length === 1 &&
            String(
                tamanhos[0]
            ).toLowerCase() === "único"
        ) {

            const unico =
                tamanhosProduto.querySelector(
                    ".btn-tamanho"
                );


            if (unico) {

                unico.classList.add(
                    "ativo"
                );

            }


            if (tamanhoSelecionado) {

                tamanhoSelecionado.textContent =
                    "Único";

            }

        }

    }


    carregarTamanhos();


    /* =====================================================
       COMPOSIÇÃO
    ===================================================== */

    function carregarComposicao() {

        if (!composicaoProduto) {
            return;
        }


        composicaoProduto.innerHTML =
            "";


        const composicao =
            Array.isArray(
                produto.composicao
            )
                ? produto.composicao
                : [];


        composicao.forEach(
            item => {

                const li =
                    document.createElement(
                        "li"
                    );


                li.textContent =
                    item;


                composicaoProduto.appendChild(
                    li
                );

            }
        );

    }


    carregarComposicao();


    /* =====================================================
       QUANTIDADE
    ===================================================== */

    let quantidadeAtual = 1;


    function atualizarQuantidade() {

        if (quantidadeProduto) {

            quantidadeProduto.textContent =
                quantidadeAtual;

        }

    }


    if (diminuirQuantidade) {

        diminuirQuantidade.addEventListener(
            "click",
            () => {

                if (
                    quantidadeAtual > 1
                ) {

                    quantidadeAtual--;

                    atualizarQuantidade();

                }

            }
        );

    }


    if (aumentarQuantidade) {

        aumentarQuantidade.addEventListener(
            "click",
            () => {

                const estoque =
                    Number(
                        produto.estoque
                    ) || 99;


                if (
                    quantidadeAtual <
                    estoque
                ) {

                    quantidadeAtual++;

                    atualizarQuantidade();

                }

            }
        );

    }


    atualizarQuantidade();


    /* =====================================================
       ADICIONAR AO CARRINHO
    ===================================================== */

    if (btnComprar) {

        btnComprar.addEventListener(
            "click",
            () => {

                const tamanhos =
                    Array.isArray(
                        produto.tamanhos
                    )
                        ? produto.tamanhos
                        : [];


                const tamanhoAtivo =
                    document.querySelector(
                        "#tamanhosProduto .btn-tamanho.ativo"
                    );


                /*
                   Produtos com vários tamanhos
                   precisam obrigatoriamente
                   de uma escolha.
                */

                if (
                    tamanhos.length > 1 &&
                    !tamanhoAtivo
                ) {

                    mostrarAvisoTamanho();

                    return;

                }


                /*
                   Produto tamanho único.
                */

                let tamanho =
                    "Único";


                if (tamanhoAtivo) {

                    tamanho =
                        tamanhoAtivo
                            .textContent
                            .trim();

                }


                /*
                   Verifica se a função do
                   carrinho realmente existe.
                */

                if (
                    typeof adicionarCarrinho !==
                    "function"
                ) {

                    console.error(
                        "adicionarCarrinho() não foi encontrada."
                    );

                    return;

                }


                /*
                   Animação do botão.
                */

                btnComprar.classList.add(
                    "adicionando-carrinho"
                );


                /*
                   Compatibilidade com
                   seu carrinho atual.
                */

                adicionarCarrinho(
                    produto.id,
                    quantidadeAtual
                );


                /*
                   Guarda temporariamente
                   o tamanho escolhido.
                */

                localStorage.setItem(
                    "ultimoTamanhoProduto",
                    JSON.stringify({
                        id: produto.id,
                        tamanho: tamanho
                    })
                );


                setTimeout(
                    () => {

                        btnComprar.classList.remove(
                            "adicionando-carrinho"
                        );

                    },
                    450
                );

            }
        );

    }


    /* =====================================================
       AVISO DE TAMANHO
    ===================================================== */

    function mostrarAvisoTamanho() {

        const toast =
            document.getElementById(
                "toastCarrinho"
            );


        if (toast) {

            /*
               O seu toast pode ter diferentes
               estruturas internas.
            */

            const texto =
                toast.querySelector(
                    "span, p, strong"
                );


            if (texto) {

                texto.textContent =
                    "Escolha o Tamanho Desejado";

            }


            toast.classList.add(
                "mostrar"
            );


            clearTimeout(
                window.__timerTamanho
            );


            window.__timerTamanho =
                setTimeout(
                    () => {

                        toast.classList.remove(
                            "mostrar"
                        );

                    },
                    2500
                );

        } else {

            alert(
                "Escolha o Tamanho Desejado"
            );

        }


        /*
           Pequeno destaque visual.
        */

        if (tamanhosProduto) {

            tamanhosProduto.classList.add(
                "tamanho-obrigatorio"
            );


            setTimeout(
                () => {

                    tamanhosProduto.classList.remove(
                        "tamanho-obrigatorio"
                    );

                },
                800
            );

        }

    }


    /* =====================================================
       PRODUTOS RELACIONADOS
    ===================================================== */

    function carregarRelacionados() {

        if (!produtosRelacionados) {
            return;
        }


        produtosRelacionados.innerHTML =
            "";


        const relacionados =
            Object.values(produtos)
                .filter(item =>
                    item &&
                    item.id !== produto.id
                )
                .filter(item => {

                    /*
                       Primeiro tenta pelo tipo.
                    */

                    if (
                        produto.tipo &&
                        item.tipo &&
                        produto.tipo ===
                        item.tipo
                    ) {

                        return true;

                    }


                    /*
                       Depois tenta pela categoria.
                    */

                    if (
                        produto.categoria &&
                        item.categoria &&
                        produto.categoria ===
                        item.categoria
                    ) {

                        return true;

                    }


                    return false;

                })
                .slice(0, 4);


        relacionados.forEach(
            item => {

                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "produto-relacionado";


                card.innerHTML = `

                    <a
                        href="produto.html?id=${encodeURIComponent(item.id)}"
                        class="imagem-relacionado"
                    >

                        <img
                            src="${item.imagens?.[0] || ""}"
                            alt="${item.nome || "Produto"}"
                            loading="lazy"
                        >

                    </a>


                    <div class="info-relacionado">

                        <span class="categoria-relacionado">
                            ${item.categoria || ""}
                        </span>


                        <h4>
                            ${item.nome || ""}
                        </h4>


                        <p class="preco">
                            ${formatarPreco(item.preco)}
                        </p>


                        <a
                            href="produto.html?id=${encodeURIComponent(item.id)}"
                            class="comprar-relacionado"
                        >
                            VER PRODUTO
                        </a>

                    </div>

                `;


                produtosRelacionados.appendChild(
                    card
                );

            }
        );

    }


    carregarRelacionados();


    /* =====================================================
       MENU HAMBÚRGUER
    ===================================================== */

    const abrirMenu =
        document.getElementById(
            "abrirMenu"
        );

    const fecharMenu =
        document.getElementById(
            "fecharMenu"
        );

    const menuLateral =
        document.getElementById(
            "menuLateral"
        );

    const overlayMenu =
        document.getElementById(
            "overlayMenu"
        );


    if (
        abrirMenu &&
        fecharMenu &&
        menuLateral &&
        overlayMenu
    ) {

        function abrir() {

            menuLateral.classList.add(
                "ativo"
            );

            overlayMenu.classList.add(
                "ativo"
            );

            document.body.style.overflow =
                "hidden";

        }


        function fechar() {

            menuLateral.classList.remove(
                "ativo"
            );

            overlayMenu.classList.remove(
                "ativo"
            );

            document.body.style.overflow =
                "";

        }


        abrirMenu.addEventListener(
            "click",
            abrir
        );


        fecharMenu.addEventListener(
            "click",
            fechar
        );


        overlayMenu.addEventListener(
            "click",
            fechar
        );


        document.addEventListener(
            "keydown",
            evento => {

                if (
                    evento.key === "Escape"
                ) {

                    fechar();

                }

            }
        );


        menuLateral
            .querySelectorAll(
                ".links-menu a"
            )
            .forEach(link => {

                link.addEventListener(
                    "click",
                    fechar
                );

            });

    }


    /* =====================================================
       PÁGINA ATIVA
    ===================================================== */

    const paginaAtual =
        window.location.pathname
            .split("/")
            .pop();


    document
        .querySelectorAll(
            ".links-menu a"
        )
        .forEach(link => {

            link.classList.remove(
                "ativo"
            );


            const href =
                link.getAttribute(
                    "href"
                ) || "";


            const paginaLink =
                href
                    .split("/")
                    .pop()
                    .split("?")[0];


            if (
                paginaLink ===
                "produtos.html" &&
                (
                    paginaAtual ===
                    "produtos.html" ||
                    paginaAtual ===
                    "produto.html"
                )
            ) {

                link.classList.add(
                    "ativo"
                );

            }


            if (
                paginaLink ===
                "index.html" &&
                (
                    paginaAtual ===
                    "index.html" ||
                    paginaAtual === ""
                )
            ) {

                link.classList.add(
                    "ativo"
                );

            }

        });


    /* =====================================================
       ANIMAÇÃO DE ENTRADA
    ===================================================== */

    const elementosAnimados =
        document.querySelectorAll(
            ".produto-container, " +
            ".produto-galeria, " +
            ".produto-info, " +
            ".produtos-relacionados, " +
            ".newsletter"
        );


    elementosAnimados.forEach(
        (elemento, index) => {

            elemento.classList.add(
                "produto-animar"
            );


            setTimeout(
                () => {

                    elemento.classList.add(
                        "visivel"
                    );

                },
                80 + index * 100
            );

        }
    );


    /* =====================================================
       FIM
    ===================================================== */

    console.log(
        "Produto carregado:",
        produto.nome,
        "| ID:",
        produto.id
    );

});