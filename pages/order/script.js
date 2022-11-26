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
const cartCloseBtn = document.getElementById("close-cart-btn");

cartCloseBtn.addEventListener("click", () => {
  closeCart(cart, cartOverlay);
});
cartOverlay.addEventListener("click", () => {
  closeCart(cart, cartOverlay);
});

const myForm = document.getElementById("myForm");

const fname = myForm["name"];
const namePattern = /[A-Za-z]{4,}[^ \d]/;

fname.addEventListener("input", () => {
  console.log(namePattern.test(fname.value));
  if (!namePattern.test(fname.value) || fname.value.trim() === "") {
    fname.closest(".label-input").classList.add("invalid");
  } else {
    fname.closest(".label-input").classList.remove("invalid");
  }
});

const surname = myForm["surname"];
const street = myForm["street"];
const house = myForm["house"];
const flat = myForm["flat"];
const date = myForm["date"];

myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid;
});
