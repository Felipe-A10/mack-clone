const produtos = [
  // Hambúrgueres
  {
    nome: "Big Clone",
    descricao: "Dois hambúrgueres, queijo, molho especial.",
    preco: 25.9,
    imagem: "assets/images/burger.png",
    categoria: "hamburgueres"
  },
  {
    nome: "Cheese Clone",
    descricao: "Hambúrguer com queijo extra.",
    preco: 22.5,
    imagem: "assets/images/burger.png",
    categoria: "hamburgueres"
  },

  // Acompanhamentos
  {
    nome: "Batata  Frita Grande",
    descricao: "Batata crocante e quentinha.",
    preco: 10.5,
    imagem: "assets/images/fries.png",
    categoria: "acompanhamentos"
  },
  {
    nome: "Batata Frita Média",
    descricao: "Porção média de batata frita.",
    preco: 8.5,
    imagem: "assets/images/fries.png",
    categoria: "acompanhamentos"
  },

  // Bebidas
  {
    nome: "Coca-Cola",
    descricao: "Coca-Cola geladinha 300ml.",
    preco: 8.5,
    imagem: "assets/images/drink.png",
    categoria: "bebidas"
  },
  {
    nome: "Sprite",
    descricao: "Sprite geladinha 300ml.",
    preco: 6.5,
    imagem: "assets/images/sprite.png",
    categoria: "bebidas"
  },

  // Sobremesas
  {
    nome: "Sundae ",
    descricao: "Sundae ainda mais irresistível",
    preco: 4.0,
    imagem: "assets/images/sundae.png",
    categoria: "sobremesas"
  
  },
  {
    nome: "Milk Shake ou McFlurry ",
    descricao: "sobremesa deliciosa para alegrar seu dia",
    preco:10.0,
    imagem:"assets/images/sobremesa.png",
    categoria:"sobremesas",
  },
];

// ELEMENTOS
const menuContainer = document.getElementById("menu-items");
const abas = document.querySelectorAll(".tab-button");
const modal = document.getElementById("product-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalPrice = document.getElementById("modal-price");
const modalAdd = document.getElementById("modal-add");
const closeModal = document.getElementById("close-modal");

const cartPanel = document.getElementById("cart-panel");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const cartCountEl = document.getElementById("cart-count");
const cartHeader = document.querySelector(".cart-header");
const closeCartBtn = document.getElementById("close-cart");

let carrinho = [];
let produtoSelecionado = null;

// FORMATA PREÇO
function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// MOSTRAR PRODUTOS
function mostrarProdutos(categoria) {
  menuContainer.innerHTML = "";

  const filtrados = produtos.filter(p => p.categoria === categoria);

  filtrados.forEach(produto => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <span class="favorite">❤️</span>
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <span>${formatarPreco(produto.preco)}</span>
      <button>Ver detalhes</button>
    `;

    const btn = card.querySelector("button");
    const fav = card.querySelector(".favorite");

    btn.addEventListener("click", () => abrirModal(produto));
    fav.addEventListener("click", () => fav.classList.toggle("active"));

    menuContainer.appendChild(card);
  });
}

// MODAL
function abrirModal(produto) {
  produtoSelecionado = produto;
  modalImg.src = produto.imagem;
  modalTitle.textContent = produto.nome;
  modalDesc.textContent = produto.descricao;
  modalPrice.textContent = formatarPreco(produto.preco);
  modal.style.display = "flex";
}

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
});

// ADICIONAR AO CARRINHO
modalAdd.addEventListener("click", () => {
  if (produtoSelecionado) {
    carrinho.push(produtoSelecionado);
    atualizarCarrinho();
    modal.style.display = "none";
  }
});

// ATUALIZAR CARRINHO
function atualizarCarrinho() {
  cartItemsContainer.innerHTML = "";
  let total = 0;

  carrinho.forEach((item, index) => {
    total += item.preco;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <span>${item.nome}</span>
      <button onclick="removerItem(${index})">❌</button>
    `;

    cartItemsContainer.appendChild(div);
  });

  cartTotalEl.textContent = formatarPreco(total);
  cartCountEl.textContent = carrinho.length;
}

function removerItem(index) {
  carrinho.splice(index, 1);
  atualizarCarrinho();
}

// ABRIR / FECHAR CARRINHO
cartHeader.addEventListener("click", () => {
  cartPanel.classList.add("active");
});

closeCartBtn.addEventListener("click", () => {
  cartPanel.classList.remove("active");
});

// ABAS
abas.forEach(aba => {
  aba.addEventListener("click", () => {
    abas.forEach(a => a.classList.remove("active"));
    aba.classList.add("active");
    mostrarProdutos(aba.dataset.category);
  });
});

// INICIALIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  mostrarProdutos("hamburgueres");
});
