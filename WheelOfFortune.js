const menuToggle=document.getElementById("menuToggle");
const navMenu=document.getElementById("navMenu");
function toggleMenu(){
  navMenu.classList.toggle("open");
  menuToggle.classList.toggle("active");
  const expanded=menuToggle.classList.contains("active");
  menuToggle.setAttribute("aria-expanded",expanded);
  navMenu.setAttribute("aria-hidden",!expanded);
}
menuToggle.addEventListener("click",toggleMenu);
menuToggle.addEventListener("keydown",(e)=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); toggleMenu(); } });

const items=[
  {label:"پوچ",emoji:"💨"},
  {label:"حذف گزینه",emoji:"❌"},
  {label:"-100 امتیاز",emoji:"🔻"},
  {label:"+100 امتیاز",emoji:"🔺"},
  {label:"پرش",emoji:"⏭️"},
  {label:"پوچ",emoji:"💨"},
  {label:"حذف گزینه",emoji:"❌"},
  {label:"-100 امتیاز",emoji:"🔻"},
  {label:"+100 امتیاز",emoji:"🔺"},
  {label:"پرش",emoji:"⏭️"}
];

const wheel=document.getElementById("wheel");
const spinBtn=document.getElementById("spinBtn");
const toast=document.getElementById("toast");
const pointer=document.getElementById("pointer");

const sliceCount=items.length;
const sliceAngle=360/sliceCount;

function createLabels(){
  items.forEach((it,i)=>{
    const el=document.createElement("div");
    el.className="slice-label";
    el.textContent=`${it.emoji} ${it.label}`;
    wheel.appendChild(el);
  });
}

function layoutLabels(){
  const labels=[...wheel.querySelectorAll(".slice-label")];
  const size=wheel.clientWidth;
  const r=(size/2)*0.7;
  labels.forEach((el,i)=>{
    const ang=-90 + (i+0.5)*sliceAngle;
    el.style.transform=`translate(-50%,-50%) rotate(${ang}deg) translate(${r}px) rotate(${-ang}deg)`;
    el.style.fontSize=`${Math.max(size/35,9)}px`;
    el.style.padding=`${Math.max(size/100,2)}px ${Math.max(size/90,3)}px`;
  });
}

createLabels();
layoutLabels();
window.addEventListener("resize",layoutLabels);

let spinning=false;
let currentRotation=0;
const storageKey='wheel-last-spin';
const DAY=24*60*60*1000;

function now(){ return Date.now(); }
function canSpin(){
  const last=parseInt(localStorage.getItem(storageKey)||'0',10);
  return (now()-last)>=DAY;
}

function timeLeft(){
  const last=parseInt(localStorage.getItem(storageKey)||'0',10);
  const diff=DAY-(now()-last);
  const h=Math.floor(diff/3600000);
  const m=Math.floor((diff%3600000)/60000);
  const s=Math.floor((diff%60000)/1000);
  return `${h}س ${m}د ${s}ث`;
}

function showToast(html){
  toast.innerHTML=html;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'),4200);
}

function updateButtonState(){
  if(!canSpin()){
    spinBtn.style.background='gray';
  } else {
    spinBtn.style.background='linear-gradient(135deg,#2563eb,#9333ea)';
  }
}

updateButtonState();

function startSpin(){
  if(!canSpin()){
    showToast(`❌ هنوز نمی‌تونی بچرخونی. تا ${timeLeft()} صبر کن`);
    return;
  }

  spinning=true;
  spinBtn.style.background='gray';
  localStorage.setItem(storageKey,String(now()));

  const targetIndex=Math.floor(Math.random()*sliceCount);
  const baseTurns=6+Math.floor(Math.random()*5);
  const targetFromTop=(targetIndex+0.5)*sliceAngle;
  const norm=((currentRotation%360)+360)%360;
  const currentTop=(360-norm)%360;
  const delta=(targetFromTop-currentTop+360)%360;
  const totalDelta=baseTurns*360+delta;
  const duration=5200+Math.floor(Math.random()*1200);

  wheel.style.transitionDuration=duration+'ms';
  currentRotation+=totalDelta;
  wheel.style.transform=`rotate(${currentRotation}deg)`;

  const tick=setInterval(()=>{
    pointer.style.transform='translateX(-50%) rotate(-6deg)';
    requestAnimationFrame(()=>{ pointer.style.transform='translateX(-50%) rotate(0deg)'; });
  },70);

  setTimeout(()=>{
    clearInterval(tick);
    pointer.style.transform='translateX(-50%) rotate(0deg)';
    const norm2=((currentRotation%360)+360)%360;
    const index=Math.floor(((360-norm2)%360)/sliceAngle)%sliceCount;
    const prize=items[index];

    showToast(`نتیجه: <strong>${prize.emoji} ${prize.label}</strong>`);

    spinning=false;
    updateButtonState();
  },duration+80);
}

spinBtn.addEventListener("click",()=>{
  if(!canSpin()){
    showToast(`❌ هنوز نمی‌تونی بچرخونی. تا ${timeLeft()} صبر کن`);
    return;
  }
  if(spinning) return;
  startSpin();
});