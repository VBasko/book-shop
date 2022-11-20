const wrapperEl = document.getElementById("wrapper");

window.addEventListener("load", () => {
  addHeader();
  addMain();
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
      span.textContent = "(0)";
      li.appendChild(span);
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

  mainEl.appendChild(main);
  wrapperEl.appendChild(mainEl);
}

function addFirstSection() {
  const sectionFirst = document.createElement("section");
  sectionFirst.setAttribute("class", "section section-first");
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

function addSecondSection() {
  const sectionSecond = document.createElement("section");
  sectionSecond.setAttribute("class", "section section-second");
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  const text = document.createElement("h2");
  text.textContent = "Trusted by 1,000,000 clients all over the world";

  container.appendChild(text);
  sectionSecond.appendChild(container);

  return sectionSecond;
}

function addThirdSection() {
  const sectionThird = document.createElement("section");
  sectionThird.setAttribute("class", "section section-third");
  const container = document.createElement("div");
  container.setAttribute("class", "container");

  const title = document.createElement("h2");
  title.textContent = "Huge catalog";

  const catalog = document.createElement("div");
  catalog.setAttribute("class", "catalog");

  fetch("./books.json") //path to the file with json data
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

function createBook(bookInfo, index) {
  const book = document.createElement("div");
  book.setAttribute("class", "book-card");
  book.setAttribute("id", `${index}`);
  const imgWrapper = document.createElement("div");

  if (index % 9 == 0 || index % 9 == 5 || index % 9 == 7) {
    imgWrapper.setAttribute("class", "book-image blue");
  } else if (index % 9 == 1 || index % 9 == 3 || index % 9 == 8) {
    imgWrapper.setAttribute("class", "book-image red");
  } else {
    imgWrapper.setAttribute("class", "book-image yellow");
  }

  const img = document.createElement("img");
  img.setAttribute("src", `${bookInfo.imageLink}`);
  img.setAttribute("height", "224px");
  img.setAttribute("width", "auto");

  const textWrapper = document.createElement("div");
  textWrapper.setAttribute("class", "book-text");

  imgWrapper.appendChild(img);
  book.appendChild(imgWrapper);

  return book;
}
