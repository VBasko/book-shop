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
  const container = document.createElement("div");
  container.setAttribute("class", "container");
  const sectionFirst = document.createElement("section");
  sectionFirst.setAttribute("class", "section section-first");
  sectionFirst.appendChild(container);

  return sectionFirst;
}

// sectionFirst.innerHTML = `
//     <div class="container">
//       <div class="left">
//         <h1>Buy <span>books</span> with delivery to your door</h1>
//         <p>
//           View a huge selection of books in our catalog. By buying online you
//           save time reading books.
//         </p>
//         <a href="#books" class="btn btn-black"> Get started </a>
//       </div>
//       <div class="right">
//         <img src="../../assets/images/hero-image.svg" alt="Girl with books" />
//       </div>
//     </div>
// `;
