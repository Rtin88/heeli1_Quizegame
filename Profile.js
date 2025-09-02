const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const backdrop = document.getElementById("backdrop");
const headerEl = document.querySelector("header");
function setMenuPosition() {
  navMenu.style.width = "300px";
  navMenu.style.left = "50%";
  navMenu.style.right = "auto";
  navMenu.style.transformOrigin = "top center";
}
function setMenuState(open) {
  navMenu.classList.toggle("open", open);
  menuToggle.classList.toggle("active", open);
  menuToggle.setAttribute("aria-expanded", open);
  navMenu.setAttribute("aria-hidden", !open);
  backdrop.classList.toggle("open", open);
  backdrop.setAttribute("aria-hidden", !open);
  if (open) setMenuPosition();
}
function toggleMenu() {
  setMenuState(!navMenu.classList.contains("open"));
}
menuToggle.addEventListener("click", toggleMenu);
menuToggle.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    toggleMenu();
  }
});
backdrop.addEventListener("click", () => setMenuState(false));
document.addEventListener("click", (e) => {
  if (!headerEl.contains(e.target)) setMenuState(false);
});
window.addEventListener("resize", () => {
  setMenuState(false);
  setMenuPosition();
});

const categories = {
  "علمی 🧪": 20,
  "تاریخ و جغرافیا 🌍": 15,
  "فرهنگ و هنر 🎨": 10,
  "ورزش 🏀": 30,
  "بازی 🎮": 25,
  "رایانه و تکنولوژی 💻": 40,
  "فیلم و سینما 🎬": 18,
  "غذا و نوشیدنی 🍔": 12,
  "زبان انگلیسی ✏️": 22,
  "اطلاعات عمومی 🧠": 35,
};
const totalScore = Object.values(categories).reduce((a, b) => a + b, 0);
document.getElementById("totalScore").textContent = totalScore;
const toggleBtn = document.getElementById("toggleDetails");
const detailsBox = document.getElementById("scoreDetails");
toggleBtn.addEventListener("click", () => {
  detailsBox.classList.toggle("active");
  toggleBtn.classList.toggle("active");
});
Object.entries(categories).forEach(([name, score]) => {
  const p = document.createElement("p");
  p.innerHTML = `<span>${name}</span><span>${score}</span>`;
  detailsBox.appendChild(p);
});
const progressContainer = document.getElementById("categoriesProgress");
const R = 44;
const C = 2 * Math.PI * R;
Object.entries(categories).forEach(([name, score]) => {
  const percent = Math.round((score / totalScore) * 100);
  const card = document.createElement("div");
  card.className = "progress-card";
  card.innerHTML = `<div class="progress-circle"><svg viewBox="0 0 96 96" width="96" height="96"><circle class="progress-bg" cx="48" cy="48" r="${R}"></circle><circle class="progress-bar" cx="48" cy="48" r="${R}" style="stroke-dasharray:${C};stroke-dashoffset:${C}"></circle></svg><div class="progress-percent">${percent}%</div></div><div class="progress-label" title="${name}">${name}</div>`;
  const bar = card.querySelector(".progress-bar");
  requestAnimationFrame(() => {
    bar.style.strokeDashoffset = String(C - (percent / 100) * C);
  });
  progressContainer.appendChild(card);
});
