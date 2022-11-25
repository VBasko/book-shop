const wrapperEl = document.getElementById("wrapper");

window.addEventListener("load", () => {
  addHeader();
  updateCartIcon();
  addMain();
  addFooter();
  addCart();
});

// Header

function addHeader() {
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  const headerEl = document.createDocumentFragment();
  const header = document.createElement("header");
  header.setAttribute("class", "header");
  header.setAttribute("id", "header");

  const logo = document.createElement("a");
  logo.setAttribute("class", "logo");
  logo.setAttribute("href", "https://vbasko.github.io/book-shop/pages/main/");
  const logoImg = document.createElement("img");
  logoImg.setAttribute("src", "../../assets/images/logo.svg");
  logo.appendChild(logoImg);
  container.appendChild(logo);

  const nav = document.createElement("nav");
  const navList = document.createElement("ul");
  navList.setAttribute("class", "nav-links");
  const links = [
    { text: "Contact", href: "#contact" },
    { text: "About", href: "#about" },
    { text: "Cart", href: "/" },
  ];

  links.map((link) => {
    const li = document.createElement("li");
    li.setAttribute("class", "nav-link");
    const a = document.createElement("a");
    a.textContent = link.text;
    a.setAttribute("href", link.href);
    li.appendChild(a);
    if (link.text == "Cart") {
      const span = document.createElement("span");
      span.setAttribute("id", "items-in-cart");
      span.textContent = `(0)`;
      li.appendChild(span);

      li.addEventListener("click", (event) => {
        event.preventDefault();
        openCart();
      });
    }
    navList.appendChild(li);
  });

  nav.appendChild(navList);
  container.appendChild(nav);
  header.appendChild(container);
  headerEl.appendChild(header);
  wrapperEl.appendChild(headerEl);
}

// Main

function addMain() {
  const mainEl = document.createDocumentFragment();
  const main = document.createElement("main");
  main.setAttribute("class", "main");
  main.setAttribute("id", "main");

  main.appendChild(addFirstSection());
  main.appendChild(addSecondSection());
  main.appendChild(addThirdSection());
  main.appendChild(addFourthSection());

  mainEl.appendChild(main);
  wrapperEl.appendChild(mainEl);
}

// Hero section

function addFirstSection() {
  const sectionFirst = document.createElement("section");
  sectionFirst.setAttribute("class", "section section-first");
  sectionFirst.setAttribute("id", "about");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  const left = document.createElement("div");
  left.setAttribute("class", "left");
  const title = document.createElement("h1");
  const paragraph = document.createElement("p");
  const startText = document.createTextNode("Buy ");
  const span = document.createElement("span");
  span.textContent = "books";
  const endText = document.createTextNode(" with delivery to your door");
  [startText, span, endText].map((el) => title.appendChild(el));

  paragraph.textContent =
    "View a huge selection of books in our catalog. By buying online you save time reading books.";
  const cta = document.createElement("a");
  cta.textContent = "Get started";
  cta.setAttribute("class", "btn get-started");
  cta.setAttribute("href", "#catalog");
  [title, paragraph, cta].map((el) => left.appendChild(el));

  const right = document.createElement("div");
  right.setAttribute("class", "right");
  const image = document.createElement("img");
  image.setAttribute("src", "../../assets/images/hero-image.svg");
  image.setAttribute("alt", "Girl with books");
  right.appendChild(image);

  container.appendChild(left);
  container.appendChild(right);
  sectionFirst.appendChild(container);

  return sectionFirst;
}

// Banner

function addSecondSection() {
  const sectionSecond = document.createElement("section");
  sectionSecond.setAttribute("class", "section section-second");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  const decor = document.createElement("div");
  const text = document.createElement("h2");
  text.textContent = "Trusted by 1,000,000 clients all over the world";
  container.appendChild(decor);
  container.appendChild(text);
  sectionSecond.appendChild(container);

  return sectionSecond;
}

// Catalog

function addThirdSection() {
  const sectionThird = document.createElement("section");
  sectionThird.setAttribute("class", "section section-third");
  sectionThird.setAttribute("id", "catalog");
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  const title = document.createElement("h2");
  title.textContent = "Huge catalog";

  const catalog = document.createElement("div");
  catalog.setAttribute("class", "catalog");

  fetch("./books.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      data.map((bookInfo, index) =>
        catalog.appendChild(createBook(bookInfo, index))
      );
    });

  [title, catalog].map((el) => container.appendChild(el));
  sectionThird.appendChild(container);

  return sectionThird;
}

// Create separate book for the catalog

function createBook(bookInfo, index) {
  let bookId = bookInfo.title
    .split(" ")
    .join("")
    .replace(/[&\/\\#, +()$~%.'":*?<>{}]/g, "");

  const book = document.createElement("div");
  book.setAttribute("class", "book-card");
  book.setAttribute("id", `${bookId}`);

  const imgWrapper = document.createElement("div");

  let bgColor;

  if (index % 9 == 0 || index % 9 == 5 || index % 9 == 7) {
    bgColor = "blue";
  } else if (index % 9 == 1 || index % 9 == 3 || index % 9 == 8) {
    bgColor = "red";
  } else {
    bgColor = "yellow";
  }

  imgWrapper.setAttribute("class", `book-image ${bgColor}`);

  const img = document.createElement("img");
  img.setAttribute("src", `${bookInfo.imageLink}`);
  img.setAttribute("alt", bookInfo.title);
  img.setAttribute("height", "224px");
  img.setAttribute("width", "auto");

  imgWrapper.appendChild(img);

  const textWrapper = document.createElement("div");
  textWrapper.setAttribute("class", "book-text");
  const author = document.createElement("p");
  author.setAttribute("class", "author");
  author.textContent = `${bookInfo.author}`;
  const title = document.createElement("p");
  title.setAttribute("class", "title");
  title.textContent = `${bookInfo.title}`;

  const rateWrapper = document.createElement("div");
  rateWrapper.setAttribute("class", "rating");
  const starsWrapper = document.createElement("div");
  starsWrapper.setAttribute("class", "stars");

  for (let i = 0; i < Math.round(bookInfo.rate); i++) {
    const star = document.createElement("img");
    star.setAttribute("src", "../../assets/images/star-icon.svg");
    starsWrapper.appendChild(star);
  }

  const reviews = document.createElement("p");
  const n = bookInfo.reviews;
  const numberFormatter = Intl.NumberFormat("en-US");
  const formatted = numberFormatter.format(n);
  reviews.textContent = `${bookInfo.rate} (${formatted})`;

  [starsWrapper, reviews].map((el) => rateWrapper.appendChild(el));

  const priceWrapper = document.createElement("div");
  priceWrapper.setAttribute("class", "price");
  const p = document.createElement("p");
  p.textContent = "Price: ";
  const price = document.createElement("span");
  price.textContent = `$${bookInfo.price}`;

  [p, price].map((el) => priceWrapper.appendChild(el));

  const moreDetailsBtn = document.createElement("button");
  moreDetailsBtn.textContent = "More details";
  moreDetailsBtn.setAttribute("class", "btn btn-white details");

  moreDetailsBtn.addEventListener("click", () => {
    openModal(bookInfo, bookId, bgColor);
  });

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to cart";
  addToCartBtn.setAttribute("class", "btn btn-yellow");
  addToCartBtn.addEventListener("click", () => {
    addToCart(bookInfo, bookId, bgColor);
  });

  [author, title, rateWrapper, priceWrapper, moreDetailsBtn, addToCartBtn].map(
    (el) => textWrapper.appendChild(el)
  );

  book.appendChild(imgWrapper);
  book.appendChild(textWrapper);

  return book;
}

function addFourthSection() {
  const sectionFourth = document.createElement("section");
  sectionFourth.setAttribute("class", "section section-fourth");
  sectionFourth.setAttribute("id", "contact");
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  const title = document.createElement("h2");
  title.textContent = "We are in contact";

  const buttonsWrapper = document.createElement("div");
  buttonsWrapper.setAttribute("class", "buttons");
  const callBtn = document.createElement("a");
  callBtn.textContent = "Call";
  callBtn.setAttribute("class", "btn btn-black");
  const chatBtn = document.createElement("a");
  chatBtn.textContent = "Chat";
  chatBtn.setAttribute("class", "btn btn-white");
  [callBtn, chatBtn].map((el) => buttonsWrapper.appendChild(el));

  [title, buttonsWrapper].map((el) => container.appendChild(el));
  sectionFourth.appendChild(container);

  return sectionFourth;
}

function addFooter() {
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  const footerEl = document.createDocumentFragment();
  const footer = document.createElement("footer");
  footer.setAttribute("class", "footer");

  const designer = document.createElement("a");
  designer.textContent = "Designed by Filipp Basko";
  designer.setAttribute(
    "href",
    "https://www.linkedin.com/in/filipp-basko-379175236/"
  );
  const developer = document.createElement("a");
  developer.textContent = "Created by Viktoriia Basko";
  developer.setAttribute("href", "https://www.linkedin.com/in/vbasko/");
  [designer, developer].map((el) => el.setAttribute("target", "_blank"));
  const copy = document.createElement("p");
  copy.setAttribute("class", "copy");
  copy.textContent = "© 2022 Bookshop";

  [designer, developer, copy].map((el) => container.appendChild(el));
  footer.appendChild(container);
  footerEl.appendChild(footer);
  wrapperEl.appendChild(footerEl);
}

function openModal(bookInfo, bookId, bgColor) {
  const modalEl = document.createDocumentFragment();
  const modal = document.createElement("div");
  modal.setAttribute("class", "modal");

  setTimeout(() => modal.setAttribute("class", "modal active"), 1);

  const overlay = document.createElement("div");
  overlay.setAttribute("class", "overlay active");

  const header = document.createElement("div");
  header.setAttribute("class", "modal-header");
  const headerText = document.createElement("p");
  headerText.textContent = `${bookInfo.title}`;
  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("class", "close-btn");
  closeBtn.innerHTML = `&times;`;

  [headerText, closeBtn].map((el) => header.appendChild(el));

  const body = document.createElement("div");
  body.setAttribute("class", "modal-body");

  // Left part

  const left = document.createElement("div");
  left.setAttribute("class", "body-left");

  const modalImage = document.createElement("div");

  modalImage.setAttribute("class", `modal-image ${bgColor}`);

  const img = document.createElement("img");
  img.setAttribute("src", `${bookInfo.imageLink}`);
  img.setAttribute("alt", bookInfo.title);
  img.setAttribute("height", "330px");
  img.setAttribute("width", "auto");

  modalImage.appendChild(img);

  const modalText = document.createElement("div");
  modalText.setAttribute("class", "modal-text");

  const author = document.createElement("p");
  author.setAttribute("class", "author");
  author.textContent = `${bookInfo.author}`;
  const title = document.createElement("p");
  title.setAttribute("class", "title");
  title.textContent = `${bookInfo.title}`;

  const rateWrapper = document.createElement("div");
  rateWrapper.setAttribute("class", "rating");
  const starsWrapper = document.createElement("div");
  starsWrapper.setAttribute("class", "stars");

  for (let i = 0; i < Math.round(bookInfo.rate); i++) {
    const star = document.createElement("img");
    star.setAttribute("src", "../../assets/images/star-icon.svg");
    starsWrapper.appendChild(star);
  }

  const reviews = document.createElement("p");
  const n = bookInfo.reviews;
  const numberFormatter = Intl.NumberFormat("en-US");
  const formatted = numberFormatter.format(n);
  reviews.textContent = `${bookInfo.rate} (${formatted})`;

  [starsWrapper, reviews].map((el) => rateWrapper.appendChild(el));

  [author, title, rateWrapper].map((el) => modalText.appendChild(el));

  [modalImage, modalText].map((el) => left.appendChild(el));

  // Right part

  const right = document.createElement("div");
  right.setAttribute("class", "body-right");

  const rightTop = document.createElement("div");
  rightTop.setAttribute("class", "right-top");
  const desc = document.createElement("p");
  desc.setAttribute("class", "description");
  desc.textContent = `${bookInfo.description}`;
  rightTop.appendChild(desc);

  const priceAndBtn = document.createElement("div");
  priceAndBtn.setAttribute("class", "right-bottom");

  const priceWrapper = document.createElement("div");
  priceWrapper.setAttribute("class", "price");
  const p = document.createElement("p");
  p.textContent = "Price: ";
  const price = document.createElement("span");
  price.textContent = `$${bookInfo.price}`;

  [p, price].map((el) => priceWrapper.appendChild(el));

  const btnWrapper = document.createElement("div");
  btnWrapper.setAttribute("class", "btnWrap");

  const addToCartBtn = document.createElement("button");
  addToCartBtn.textContent = "Add to cart";
  addToCartBtn.setAttribute("class", "btn btn-yellow");
  addToCartBtn.addEventListener("click", () => {
    addToCart(bookInfo, bookId, bgColor);
  });

  btnWrapper.appendChild(addToCartBtn);

  [priceWrapper, btnWrapper].map((el) => priceAndBtn.appendChild(el));

  [rightTop, priceAndBtn].map((el) => right.appendChild(el));

  [left, right].map((el) => body.appendChild(el));

  [header, body].map((el) => modal.appendChild(el));

  [overlay, closeBtn].map((el) =>
    el.addEventListener("click", () => {
      closeModal(modal, overlay);
    })
  );
  [modal, overlay].map((el) => modalEl.appendChild(el));
  wrapperEl.appendChild(modalEl);
}

function closeModal(modal, overlay) {
  modal.classList.remove("active");
  overlay.classList.remove("active");
  setTimeout(() => {
    wrapperEl.removeChild(modal);
    wrapperEl.removeChild(overlay);
  }, 1000);
}

function addCart() {
  const cartEl = document.createDocumentFragment();
  const cart = document.createElement("div");
  cart.setAttribute("class", "cart");
  cart.setAttribute("id", "cart");

  const cartHeader = document.createElement("div");
  cartHeader.classList.add("cart-header");
  const cartName = document.createElement("p");
  cartName.textContent = "Cart";
  const closeBtn = document.createElement("button");
  closeBtn.setAttribute("class", "close-btn");
  closeBtn.innerHTML = `&times;`;
  [cartName, closeBtn].map((el) => cartHeader.appendChild(el));

  const cartBody = document.createElement("div");
  cartBody.classList.add("cart-body");
  cartBody.setAttribute("id", "cart-body");

  const total = document.createElement("p");
  total.setAttribute("class", "total-price");
  total.setAttribute("id", "total-price");

  const goToCheckout = document.createElement("a");
  goToCheckout.setAttribute("class", "btn btn-yellow go-to-checkout");
  goToCheckout.setAttribute("id", "go-to-checkout");
  goToCheckout.setAttribute(
    "href",
    "https://vbasko.github.io/book-shop/pages/order/"
  );
  goToCheckout.textContent = "Go to checkout";

  [cartHeader, cartBody, total, goToCheckout].map((el) => cart.appendChild(el));

  const overlay = document.createElement("div");
  overlay.setAttribute("class", "overlay");
  overlay.setAttribute("id", "cart-overlay");

  [cart, overlay].map((el) => cartEl.appendChild(el));
  wrapperEl.appendChild(cartEl);

  [closeBtn, overlay].map((el) =>
    el.addEventListener("click", () => {
      closeCart(cart, overlay);
    })
  );
}
