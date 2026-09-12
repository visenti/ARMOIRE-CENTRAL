/*======================================================
 ARMOIRE CENTRAL
 CARRINHO DE COMPRAS
======================================================*/

//======================================================
// LOCAL STORAGE
//======================================================

let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

//======================================================
// ELEMENTOS
//======================================================

const painelCarrinho = document.getElementById("carrinho");
const overlayCarrinho = document.getElementById("overlayCarrinho");
const abrirCarrinho = document.getElementById("abrirCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");

const listaCarrinho = document.getElementById("listaCarrinho");
const totalCarrinho = document.getElementById("totalCarrinho");

const contadorCarrinho = document.querySelector(".contador-carrinho");

const toast = document.getElementById("toastCarrinho");

//======================================================
// SALVAR
//======================================================

function salvarCarrinho() {

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

}

//======================================================
// CONTADOR
//======================================================

function atualizarContador() {

    if (!contadorCarrinho) return;

    let quantidade = 0;

    carrinho.forEach(item => {

        quantidade += item.quantidade;

    });

    contadorCarrinho.textContent = quantidade;

}

//======================================================
// TOAST
//======================================================

let timerToast;

function mostrarToast(texto = "Produto adicionado ao carrinho com sucesso!") {

    if (!toast) return;

    toast.querySelector("span").textContent = texto;

    toast.classList.add("mostrar");

    clearTimeout(timerToast);

    timerToast = setTimeout(() => {

        toast.classList.remove("mostrar");

    }, 2500);

}

//======================================================
// ABRIR
//======================================================

function abrirMenuCarrinho() {

    if (!painelCarrinho) return;

    painelCarrinho.classList.add("ativo");

    overlayCarrinho.classList.add("ativo");

    atualizarCarrinho();

}

//======================================================
// FECHAR
//======================================================

function fecharMenuCarrinho() {

    painelCarrinho.classList.remove("ativo");

    overlayCarrinho.classList.remove("ativo");

}

//======================================================
// EVENTOS
//======================================================

if (abrirCarrinho) {

    abrirCarrinho.addEventListener("click", abrirMenuCarrinho);

}

if (fecharCarrinho) {

    fecharCarrinho.addEventListener("click", fecharMenuCarrinho);

}

if (overlayCarrinho) {

    overlayCarrinho.addEventListener("click", fecharMenuCarrinho);

}

const btnContinuar = document.getElementById("continuarComprando");

if (btnContinuar) {

    btnContinuar.addEventListener("click", fecharMenuCarrinho);

}

//======================================================
// ADICIONAR PRODUTO
//======================================================

function adicionarCarrinho(
idProduto,
quantidade = 1,
tamanho = "Único"
){

    const existente = carrinho.find(item => item.id === idProduto);

    if (existente) {

        existente.quantidade += quantidade;

    } else {

       carrinho.push({

        id:idProduto,

        quantidade:quantidade,

        tamanho:tamanho

});
    }

    salvarCarrinho();

    atualizarContador();

    atualizarCarrinho();

    mostrarToast();

}

//======================================================
// REMOVER
//======================================================

function removerProduto(id) {

    carrinho = carrinho.filter(item => item.id !== id);

    salvarCarrinho();

    atualizarContador();

    atualizarCarrinho();

}

//======================================================
// AUMENTAR
//======================================================

function aumentarQuantidade(id) {

    const produto = carrinho.find(item => item.id === id);

    if (!produto) return;

    produto.quantidade++;

    salvarCarrinho();

    atualizarContador();

    atualizarCarrinho();

}

//======================================================
// DIMINUIR
//======================================================

function diminuirQuantidade(id) {

    const produto = carrinho.find(item => item.id === id);

    if (!produto) return;

    produto.quantidade--;

    if (produto.quantidade <= 0) {

        removerProduto(id);

        return;

    }

    salvarCarrinho();

    atualizarContador();

    atualizarCarrinho();

}
//======================================================
// RENDERIZAR CARRINHO
//======================================================

function atualizarCarrinho() {

    if (!listaCarrinho || !totalCarrinho) return;

    listaCarrinho.innerHTML = "";

    // Carrinho vazio
    if (carrinho.length === 0) {

        listaCarrinho.innerHTML = `

            <div class="carrinho-vazio">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>Seu carrinho está vazio</h3>

                <p>Adicione produtos para continuar.</p>

            </div>

        `;

        totalCarrinho.textContent = "R$ 0,00";

        return;

    }

    let total = 0;

    carrinho.forEach(item => {

        const produto = produtos[item.id];

        if (!produto) return;

        const subtotal = produto.preco * item.quantidade;

        total += subtotal;

        const card = document.createElement("div");

        card.className = "item-carrinho";

        card.innerHTML = `

            <div class="imagem-item">

                <img src="${produto.imagens[0]}" alt="${produto.nome}">

            </div>

            <div class="dados-item">

                <h4>${produto.nome}</h4>

                <p class="tamanho-item">

                    Tamanho: ${item.tamanho}

                </p>

                <p class="categoria">

                    ${produto.categoria}

                </p>

                <p class="preco">

                    ${produto.preco.toLocaleString("pt-BR",{

                        style:"currency",

                        currency:"BRL"

                    })}

                </p>

                <div class="acoes-item">

                    <div class="controle-qtd">

                        <button
                        class="menos"
                        onclick="diminuirQuantidade('${produto.id}')">

                            −

                        </button>

                        <span>

                            ${item.quantidade}

                        </span>

                        <button
                        class="mais"
                        onclick="aumentarQuantidade('${produto.id}')">

                            +

                        </button>

                    </div>

                    <button
                    class="btn-remover"
                    onclick="removerProduto('${produto.id}')">

                        Remover

                    </button>

                </div>

            </div>

        `;

        listaCarrinho.appendChild(card);

    });

    totalCarrinho.textContent = total.toLocaleString(

        "pt-BR",

        {

            style: "currency",

            currency: "BRL"

        }

    );

}

//======================================================
// LIMPAR CARRINHO
//======================================================

function limparCarrinho() {

    carrinho = [];

    salvarCarrinho();

    atualizarCarrinho();

    atualizarContador();

}

//======================================================
// FINALIZAR COMPRA
//======================================================

const btnFinalizar = document.querySelector(".btn-finalizar");

if (btnFinalizar) {

    btnFinalizar.addEventListener("click", () => {

        if (carrinho.length === 0) {

            mostrarToast("Seu carrinho está vazio.");

            return;

        }

        mostrarToast("Checkout disponível em breve!");

    });

}
//======================================================
// INICIALIZAÇÃO
//======================================================

function iniciarCarrinho() {

    atualizarContador();

    atualizarCarrinho();

}

document.addEventListener("DOMContentLoaded", iniciarCarrinho);

//======================================================
// BOTÃO COMPRAR DA PÁGINA DO PRODUTO
//======================================================

const botaoComprar = document.querySelector(".comprar");

if (botaoComprar && typeof produto !== "undefined") {

    botaoComprar.addEventListener("click", () => {

        const quantidade = parseInt(

            document.getElementById("qtd").value

        ) || 1;

        adicionarCarrinho(produto.id, quantidade);

    });

}

//======================================================
// BOTÕES COMPRAR DO CATÁLOGO
//======================================================

document.querySelectorAll(".btn-comprar").forEach(botao => {

    botao.addEventListener("click", function(e){

        e.preventDefault();

        e.stopPropagation();

        const id = this.dataset.id;

        adicionarCarrinho(id);

    });

});

//======================================================
// CONTINUAR COMPRANDO
//======================================================

const continuar = document.getElementById("continuarComprando");

if(continuar){

    continuar.addEventListener("click",()=>{

        fecharMenuCarrinho();

    });

}

//======================================================
// FECHAR COM ESC
//======================================================

document.addEventListener("keydown",(e)=>{

    if(e.key==="Escape"){

        fecharMenuCarrinho();

    }

});

//======================================================
// DISPONIBILIZAR FUNÇÕES GLOBALMENTE
//======================================================

window.adicionarCarrinho = adicionarCarrinho;

window.removerProduto = removerProduto;

window.aumentarQuantidade = aumentarQuantidade;

window.diminuirQuantidade = diminuirQuantidade;

window.limparCarrinho = limparCarrinho;