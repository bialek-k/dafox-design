export const scrollToElement = (e) => {
  console.log(e.target);
  e.preventDefault();
  setTimeout(() => {
    window.scrollTo({
      top:
        document.getElementById(e.target.getAttribute("name")).offsetTop - 40,
      behavior: "smooth",
    });
  }, 100);
};
