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
  generateCartItems();

  const cart = document.getElementById("cart");
  setTimeout(() => cart.setAttribute("class", "cart active"), 1);

  const overlay = document.getElementById("cart-overlay");
  overlay.setAttribute("class", "overlay active");
}

function closeCart(cart, overlay) {
  cart.classList.remove("active");
  overlay.classList.remove("active");
}

function generateCartItems() {
  const cartBody = document.getElementById("cart-body");
  const total = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("go-to-checkout");

  if (cartData.length === 0) {
    cartBody.innerHTML = `
      <p class="empty-message">The cart is empty</p>
    `;
    total.classList.add("hidden");
    checkoutBtn.classList.add("hidden");
  } else {
    cartBody.innerHTML = cartData
      .map((el) => {
        let { id, title, author, price, imgLink, bgColor } = el;

        return `
            <div class="cart-book">
              <div class="cart-book-img ${bgColor}">
                <img src=${imgLink} />
              </div>
              <div class="cart-book-details">
                <p class="author">${author}</p>
                <p class="title">${title}</p>
              </div>
              <div class="x-price">
                <button class="remove-btn" onclick="removeBook(${id})">&times;</button
                ><span class="price-in-cart">$${price}</span>
              </div>
            </div>
      `;
      })
      .join("");

    total.innerHTML = `Total: $${cartData
      .map((el) => el.price)
      .reduce((a, b) => a + b)}`;

    total.classList.remove("hidden");
    checkoutBtn.classList.remove("hidden");
  }

  return cartBody;
}

function removeBook(el) {
  console.log(el);
  cartData = cartData.filter((x) => x.id !== el.id);
  generateCartItems();
  updateCartIcon();
  localStorage.setItem("data", JSON.stringify(cartData));
}
