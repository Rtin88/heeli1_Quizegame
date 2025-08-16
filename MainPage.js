const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");

function toggleMenu() {
  navMenu.classList.toggle("open");
  menuToggle.classList.toggle("active");
  const expanded = menuToggle.classList.contains("active");
  menuToggle.setAttribute("aria-expanded", expanded);
  navMenu.setAttribute("aria-hidden", !expanded);
}

menuToggle.addEventListener("click", toggleMenu);

menuToggle.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleMenu();
  }
});
