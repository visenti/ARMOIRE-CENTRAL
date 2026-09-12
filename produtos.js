function aplicarFiltros(){

    const produtosFiltrados = Object.values(produtos).filter(produto => {

        // filtros...

        return true;

/* =========================================================
   FILTRO DE COR
========================================================= */

if(corSelecionada){

    const possuiCor = produto.cores?.some(cor =>

        cor.nome.toLowerCase() === corSelecionada.toLowerCase()

    );

    if(!possuiCor){

        return false;

    }

}

    });

}    
    
/* =========================================================
   FILTRO DE CORES
========================================================= */

const botoesCores = document.querySelectorAll(".cores span");

let corSelecionada = null;


botoesCores.forEach(botao => {

    botao.addEventListener("click", () => {

        const cor = botao.dataset.cor;

        /* Clicar novamente remove o filtro */

        if(corSelecionada === cor){

            corSelecionada = null;

            botao.classList.remove("ativo");

        }else{

            corSelecionada = cor;

            botoesCores.forEach(item => {

                item.classList.remove("ativo");

            });

            botao.classList.add("ativo");

        }

        aplicarFiltros();

    });

});