// Header interactions

const header = document.getElementsByClassName("header");

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  scroll > 0
    ? header[0].classList.add("active")
    : header[0].classList.remove("active");
});

// Cart interactions

let cart = JSON.parse(localStorage.getItem("data")) || [];

function addToCart(id) {
  console.log(id);
}

function openCart() {
  const cartEl = document.createDocumentFragment();
  const cart = document.createElement("div");
  cart.setAttribute("class", "cart active");
  const overlay = document.createElement("div");
  overlay.setAttribute("class", "overlay active");
  overlay.addEventListener("click", () => {
    closeCart(cart, overlay);
  });

  [cart, overlay].map((el) => cartEl.appendChild(el));
  wrapperEl.appendChild(cartEl);
}

function closeCart(cart, overlay) {
  cart.classList.remove("active");
  overlay.classList.remove("active");
  setTimeout(() => {
    wrapperEl.removeChild(cart);
    wrapperEl.removeChild(overlay);
  }, 1000);
}
