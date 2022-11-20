const header = document.getElementsByClassName("header");

window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  scroll > 0
    ? header[0].classList.add("active")
    : header[0].classList.remove("active");
});
