const hamburger = document.querySelector(".hamburger");
const closeMenu = document.querySelector(".close-menu");
const mobileMenu = document.querySelector(".nav-mobile-menu");
const overlay = document.querySelector(".nav-overlay");

function openMenu() {
  mobileMenu?.classList.add("active");
  overlay?.classList.add("active");
}

function closeMobileMenu() {
  mobileMenu?.classList.remove("active");
  overlay?.classList.remove("active");
}

hamburger?.addEventListener("click", openMenu);
closeMenu?.addEventListener("click", closeMobileMenu);
overlay?.addEventListener("click", closeMobileMenu);

document.querySelectorAll(".nav-mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMobileMenu);
});

const productButtons = document.querySelectorAll(".product-open");
const productModal = document.getElementById("productModal");
const modalClose = document.getElementById("modalClose");

const modalImg = document.getElementById("modalImg");
const modalName = document.getElementById("modalName");
const modalSize = document.getElementById("modalSize");
const modalDesc = document.getElementById("modalDesc");
const modalMade = document.getElementById("modalMade");
const modalBenefit = document.getElementById("modalBenefit");
const modalStock = document.getElementById("modalStock");
const buyButton = document.getElementById("buyButton");

function openProductModal(product) {
  const name = product.dataset.name || "Candle";
  const size = product.dataset.size || "10 oz";
  const price = product.dataset.price || "19.99";
  const stock = product.dataset.stock || "true";
  const link = product.dataset.link || "#";
  const desc = product.dataset.desc || "";
  const made = product.dataset.made || "";
  const benefit = product.dataset.benefit || "";

  modalImg.src = "images/product-main.png";
  modalImg.alt = `${name} candle`;

  modalName.textContent = name;
  modalSize.textContent = `${size} · $${price}`;
  modalDesc.textContent = desc;
  modalMade.textContent = made;
  modalBenefit.textContent = benefit;

  if (stock === "false") {
    modalStock.textContent = "Out of stock — this product is not available right now.";
    buyButton.style.display = "none";
  } else {
    modalStock.textContent = "";
    buyButton.style.display = "inline-flex";
    buyButton.textContent = `Buy ${size} — $${price}`;
    buyButton.href = link;
  }

  productModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeProductModal() {
  productModal.classList.remove("active");
  document.body.style.overflow = "";
}

productButtons.forEach((product) => {
  product.addEventListener("click", () => openProductModal(product));
});

modalClose?.addEventListener("click", closeProductModal);

productModal?.addEventListener("click", (event) => {
  if (event.target === productModal) {
    closeProductModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && productModal?.classList.contains("active")) {
    closeProductModal();
  }
});
