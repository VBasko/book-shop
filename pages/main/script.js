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
