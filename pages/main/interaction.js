// Header interactions

const header = document.getElementsByClassName("header");

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  scroll > 0
    ? header[0].classList.add("active")
    : header[0].classList.remove("active");
});

// Cart interactions

let cartData = JSON.parse(localStorage.getItem("data")) || [];

function addToCart(bookInfo, id, bgColor) {
  let selectedItem = id;
  let search = cartData.find((el) => el.id === selectedItem);

  if (search === undefined) {
    cartData.push({
      id: selectedItem,
      title: bookInfo.title,
      author: bookInfo.author,
      imgLink: bookInfo.imageLink,
      price: bookInfo.price,
      bgColor: bgColor,
      item: 1,
    });
  } else {
    return;
    // for future functionality for adding a lot of books
    // search.item += 1;
  }

  localStorage.setItem("data", JSON.stringify(cartData));
  updateCartIcon();
}

function updateCartIcon() {
  let cartInfo = document.getElementById("items-in-cart");
  let itemsInCart = cartData.map((el) => el.item).reduce((a, b) => a + b, 0);
  cartInfo.innerHTML = `(${itemsInCart})`;
}

function openCart() {
  const cartEl = document.createDocumentFragment();
  const cart = document.createElement("div");
  cart.setAttribute("class", "cart");

  setTimeout(() => cart.setAttribute("class", "cart active"), 1);

  const cartHeader = document.createElement("div");
  cartHeader.classList.add("cart-header");
  const cartName = document.createElement("p");
  cartName.textContent = "Cart";
  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("class", "close-btn");
  closeBtn.innerHTML = `&times;`;
  [cartName, closeBtn].map((el) => cartHeader.appendChild(el));

  const cartBody = generateCartItems();

  [cartHeader, cartBody].map((el) => cart.appendChild(el));

  const overlay = document.createElement("div");
  overlay.setAttribute("class", "overlay active");

  [closeBtn, overlay].map((el) =>
    el.addEventListener("click", () => {
      closeCart(cart, overlay);
    })
  );

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

function generateCartItems() {
  const cartBody = document.createElement("div");
  cartBody.classList.add("cart-body");

  if (cartData.length === 0) {
    const message = document.createElement("p");
    message.textContent = "The cart is empty";
    message.classList.add("empty-message");
    cartBody.appendChild(message);
  } else {
    cartData.map((el) => cartBody.appendChild(bookInCart(el)));
  }

  const total = document.createElement("p");
  total.textContent = `Total: $${cartData
    .map((el) => el.price)
    .reduce((a, b) => a + b)}`;

  [total].map((el) => cartBody.appendChild(el));

  return cartBody;
}

function bookInCart(el) {
  let { id, title, author, price, imgLink, bgColor } = el;

  const book = document.createElement("div");
  book.setAttribute("class", "cart-book");

  const imgWrapper = document.createElement("div");
  imgWrapper.setAttribute("class", `cart-book-img ${bgColor}`);
  const img = document.createElement("img");
  img.setAttribute("src", `${imgLink}`);
  imgWrapper.appendChild(img);

  const details = document.createElement("div");
  details.setAttribute("class", "cart-book-details");
  const authorEl = document.createElement("p");
  authorEl.setAttribute("class", "author");
  authorEl.textContent = `${author}`;
  const titleEl = document.createElement("p");
  titleEl.setAttribute("class", "title");
  titleEl.textContent = `${title}`;
  [authorEl, titleEl].map((el) => details.appendChild(el));

  const xAndPrice = document.createElement("div");
  xAndPrice.setAttribute("class", "x-price");
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "remove-btn");
  deleteBtn.innerHTML = `&times;`;
  deleteBtn.addEventListener("click", () => {
    removeBook(id);
  });
  const priceEl = document.createElement("span");
  priceEl.setAttribute("class", "price-in-cart");
  priceEl.textContent = `$${price}`;
  [deleteBtn, priceEl].map((el) => xAndPrice.appendChild(el));

  [imgWrapper, details, xAndPrice].map((el) => book.appendChild(el));
  return book;
}

function removeBook(id) {
  cartData = cartData.filter((x) => x.id !== id);
  openCart();
  localStorage.setItem("data", JSON.stringify(cartData));
}
