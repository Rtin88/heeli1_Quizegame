//header
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



//title
const textElement = document.getElementById("typewriter");
const sentences = [
    "IQ",
    "Infini Quiz",
];
let i = 0, j = 0;
let isDeleting = false;
let isWaiting = false;
let speed = 100;

function getRandomDelay() {
    return Math.floor(Math.random() * 1000) + 500; 
}

function typeWriter() {
    if (isWaiting) {
        setTimeout(typeWriter, speed);
        return;
    }

    const currentText = sentences[i];
    
    let displayText = currentText.substring(0, j);
    if (!isDeleting) {
        displayText = `<span class="typewriter-text">${displayText}</span><span class="typewriter-cursor">|</span>`;
    } else {
        displayText = `<span class="typewriter-text">${displayText}</span>`;
    }
    
    textElement.innerHTML = displayText;

    if (!isDeleting && j < currentText.length) {
        j++;
        speed = 100 + Math.random() * 50;
    } else if (isDeleting && j > 0) {
        j--;
        speed = 30;
    } else if (j === currentText.length) {
        isDeleting = true;
        isWaiting = true;
        speed = getRandomDelay();
        setTimeout(() => { isWaiting = false; }, speed);
    } else if (j === 0 && isDeleting) {
        isDeleting = false;
        i = (i + 1) % sentences.length;
        isWaiting = true;
        speed = getRandomDelay();   
        setTimeout(() => { isWaiting = false; }, speed);
    }

    setTimeout(typeWriter, speed);
}

typeWriter();