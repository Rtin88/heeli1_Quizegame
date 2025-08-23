const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
function toggleMenu(){ 
  navMenu.classList.toggle("open"); 
  menuToggle.classList.toggle("active"); 
  const expanded = menuToggle.classList.contains("active"); 
  menuToggle.setAttribute("aria-expanded", expanded); 
  navMenu.setAttribute("aria-hidden", !expanded);
}
menuToggle.addEventListener("click", toggleMenu);
menuToggle.addEventListener("keydown", (e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); toggleMenu(); } });

const textElement = document.getElementById("typewriter");
const sentences = ["IQ","Infini Quiz"];
let i=0,j=0,isDeleting=false,isWaiting=false,speed=100;
function getRandomDelay(){ return Math.floor(Math.random()*1000)+500; }
function typeWriter(){
  if(isWaiting){ setTimeout(typeWriter,speed); return; }
  const currentText = sentences[i];
  let displayText = currentText.substring(0,j);
  displayText = !isDeleting ? `<span class="typewriter-text">${displayText}</span><span class="typewriter-cursor">|</span>` : `<span class="typewriter-text">${displayText}</span>`;
  textElement.innerHTML = displayText;
  if(!isDeleting&&j<currentText.length){ j++; speed=100+Math.random()*50; }
  else if(isDeleting&&j>0){ j--; speed=30; }
  else if(j===currentText.length){ isDeleting=true; isWaiting=true; speed=getRandomDelay(); setTimeout(()=>{isWaiting=false;},speed); }
  else if(j===0&&isDeleting){ isDeleting=false; i=(i+1)%sentences.length; isWaiting=true; speed=getRandomDelay(); setTimeout(()=>{isWaiting=false;},speed); }
  setTimeout(typeWriter,speed);
}
typeWriter();

(function(){
  const els=document.querySelectorAll('.reveal');
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('show'); io.unobserve(e.target); } });
  },{threshold:.12});
  els.forEach(el=>io.observe(el));
})();

(function(){
  const emojis = ["🎮","🥇","💡","🍔","🏀","🪐","🎲","💻","🎯","🧠"];
  const layer = document.createElement("div");
  layer.className = "emoji-layer";
  document.body.appendChild(layer);
  emojis.forEach((em,i)=>{
    const span = document.createElement("span");
    span.className="emoji float emoji-"+(i+1);
    span.textContent = em;
    layer.appendChild(span);
  });
})();
