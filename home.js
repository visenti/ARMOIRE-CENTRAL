/* =========================================================
   ARMOIRE CENTRAL
   HOME PAGE — ANIMAÇÕES
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const menuLateral =
        document.getElementById("menuLateral");

    const menuOverlay =
        document.getElementById("menuOverlay");


    /* =====================================================
       HERO — ENTRADA DOS ELEMENTOS
    ===================================================== */

    const heroConteudo = document.querySelector(".hero-conteudo");

    if (heroConteudo) {

        heroConteudo.classList.add("hero-carregado");

    }



    /* =====================================================
       ELEMENTOS QUE APARECEM DURANTE O SCROLL
    ===================================================== */

    const elementosAnimados = document.querySelectorAll(
        ".introducao-home, " +
        ".destaque-imagem, " +
        ".destaque-conteudo, " +
        ".titulo-secao, " +
        ".categoria-home, " +
        ".beneficio, " +
        ".newsletter-conteudo, " +
        ".footer-coluna"
    );


    elementosAnimados.forEach(function (elemento) {

        elemento.classList.add("animar-scroll");

    });



    /* =====================================================
       OBSERVER
    ===================================================== */

    const observer = new IntersectionObserver(

        function (entradas, observerAtual) {

            entradas.forEach(function (entrada) {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visivel");

                    observerAtual.unobserve(entrada.target);

                }

            });

        },

        {
            threshold: 0.15,

            rootMargin: "0px 0px -60px 0px"
        }

    );


    elementosAnimados.forEach(function (elemento) {

        observer.observe(elemento);

    });



    /* =====================================================
       ANIMAÇÃO DAS CATEGORIAS
    ===================================================== */

    const categorias =
        document.querySelectorAll(".categoria-home");


    categorias.forEach(function (categoria, indice) {

        categoria.style.transitionDelay =
            `${indice * 0.12}s`;

    });



    /* =====================================================
       ANIMAÇÃO DOS BENEFÍCIOS
    ===================================================== */

    const beneficios =
        document.querySelectorAll(".beneficio");


    beneficios.forEach(function (beneficio, indice) {

        beneficio.style.transitionDelay =
            `${indice * 0.10}s`;

    });



    /* =====================================================
       HEADER — EFEITO AO DESCER A PÁGINA
    ===================================================== */

    const header =
        document.querySelector(".header-home");

    const topBar =
    document.querySelector(".top-bar");


    function verificarScroll() {

    if (!header) return;

    const scrollAtual = window.scrollY;

    if (scrollAtual > 70) {

        header.classList.add("header-scroll");

        if (topBar) {
            topBar.classList.add("topbar-clara");
        }

    } else {

        header.classList.remove("header-scroll");

        if (topBar) {
            topBar.classList.remove("topbar-clara");
        }
    }
    
window.addEventListener("scroll", verificarScroll);

verificarScroll();

}
    /* =====================================================
       PARALLAX SUAVE DO HERO
    ===================================================== */

    const heroImagem =
        document.querySelector(".hero-imagem img");


    function moverHero() {

        if (!heroImagem) return;


        const scroll =
            window.scrollY;


        if (scroll <= window.innerHeight) {

            heroImagem.style.transform =
                `translateY(${scroll * 0.10}px) scale(1.02)`;

        }

    }


    window.addEventListener(
        "scroll",
        moverHero,
        { passive: true }
    );



    /* =====================================================
       LINKS DO MENU
       FECHA O MENU AO CLICAR
    ===================================================== */

    const linksMenu =
        document.querySelectorAll(".menu-links a");


    linksMenu.forEach(function (link) {

        link.addEventListener("click", function () {

            if (
                menuLateral &&
                menuOverlay
            ) {

                menuLateral.classList.remove("aberto");

                menuOverlay.classList.remove("ativo");

                document.body.classList.remove("menu-aberto");

            }

        });

    });



    /* =====================================================
       NEWSLETTER — PREVENIR ENVIO TEMPORÁRIO
    ===================================================== */

    const newsletterForm =
        document.querySelector(".newsletter-form");


    if (newsletterForm) {

        newsletterForm.addEventListener(
            "submit",
            function (evento) {

                evento.preventDefault();

                const botao =
                    newsletterForm.querySelector("button");

                if (!botao) return;


                const textoOriginal =
                    botao.querySelector("span");


                if (textoOriginal) {

                    const textoAnterior =
                        textoOriginal.textContent;


                    textoOriginal.textContent =
                        "INSCRITO ✓";


                    setTimeout(function () {

                        textoOriginal.textContent =
                            textoAnterior;

                    }, 2500);

                }

            }
        );

    }


});