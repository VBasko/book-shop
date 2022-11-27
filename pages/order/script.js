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
const namePattern = /^[A-Za-z]{4,}$/;
let isNameValid = false;

fname.addEventListener("input", () => {
  if (!namePattern.test(fname.value) || fname.value.trim() === "") {
    fname.closest(".label-input").classList.add("invalid");
    isNameValid = false;
    checkAllInputFields();
  } else {
    fname.closest(".label-input").classList.remove("invalid");
    isNameValid = true;
    checkAllInputFields();
  }
});

const surname = myForm["surname"];
const surnamePattern = /^[A-Za-z]{5,}$/;
let isSurnameValid = false;

surname.addEventListener("input", () => {
  if (!surnamePattern.test(surname.value) || surname.value.trim() === "") {
    surname.closest(".label-input").classList.add("invalid");
    isSurnameValid = false;
    checkAllInputFields();
  } else {
    surname.closest(".label-input").classList.remove("invalid");
    isSurnameValid = true;
    checkAllInputFields();
  }
});

const street = myForm["street"];
const streetPattern = /[A-Za-z0-9\s]{5,}/;
let isStreetValid = false;

street.addEventListener("input", () => {
  if (!streetPattern.test(street.value) || street.value.trim() === "") {
    street.closest(".label-input").classList.add("invalid");
    isStreetValid = false;
    checkAllInputFields();
  } else {
    street.closest(".label-input").classList.remove("invalid");
    isStreetValid = true;
    checkAllInputFields();
  }
});

const house = myForm["house"];
const housePattern = /^[\d]*$/;
let isHouseValid = false;

house.addEventListener("input", () => {
  if (!housePattern.test(house.value) || house.value.trim() === "") {
    house.closest(".label-input").classList.add("invalid");
    isHouseValid = false;
    checkAllInputFields();
  } else {
    house.closest(".label-input").classList.remove("invalid");
    isHouseValid = true;
    checkAllInputFields();
  }
});

const flat = myForm["flat"];
const flatPattern = /^[\d]+[\d-]*[\d]*$/;
let isFlatValid = false;

flat.addEventListener("input", () => {
  if (!flatPattern.test(flat.value) || flat.value.trim() === "") {
    flat.closest(".label-input").classList.add("invalid");
    isFlatValid = false;
    checkAllInputFields();
  } else {
    flat.closest(".label-input").classList.remove("invalid");
    isFlatValid = true;
    checkAllInputFields();
  }
});

const date = myForm["date"];
const minDate = new Date();
minDate.setDate(minDate.getDate() + 1);
let year = minDate.getFullYear();
let month = minDate.getMonth() + 1;
if (month < 10) {
  month = "0" + month;
}
let day = minDate.getDate();
if (day < 10) {
  day = "0" + day;
}
date.setAttribute("min", `${year}-${month}-${day}`);

function checkAllInputFields() {
  const submitBtn = document.getElementById("form-submit-btn");
  if (
    isNameValid &&
    isSurnameValid &&
    isStreetValid &&
    isHouseValid &&
    isFlatValid
  ) {
    submitBtn.disabled = false;
  } else {
    submitBtn.disabled = true;
  }
}

myForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let isValid;
});
