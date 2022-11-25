window.addEventListener("load", () => {
  updateCartIcon();
});

const cartLink = document.getElementById("cart-link");

cartLink.addEventListener("click", (event) => {
  event.preventDefault();
  openCart();
});

const cart = document.getElementById("cart");
const cartOverlay = document.getElementById("cart-overlay");

cartOverlay.addEventListener("click", () => {
  closeCart(cart, cartOverlay);
});
