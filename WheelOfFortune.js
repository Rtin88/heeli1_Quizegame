const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.addEventListener("click",()=>{ 
  navMenu.classList.toggle("open"); 
  menuToggle.classList.toggle("active"); 
});

const prizes = ["🎁 جایزه ۱","🎉 جایزه ۲","🎁 جایزه ۱","🎉 جایزه ۲","🎁 جایزه ۳","🎊 جایزه ۴","🎁 جایزه ۳","🎊 جایزه ۴","🎁 جایزه ۵","🎉 جایزه ۶"];
const wheel = document.querySelector(".wheel g");
const sliceAngle = 360 / prizes.length;

for(let i=0;i<prizes.length;i++){
  const rotate = sliceAngle*i;
  const x = Math.cos((rotate+sliceAngle/2-90)*Math.PI/180)*120;
  const y = Math.sin((rotate+sliceAngle/2-90)*Math.PI/180)*120;

  const path = document.createElementNS("http://www.w3.org/2000/svg","path");
  path.setAttribute("d",`M0,0 L${250*Math.cos((rotate-90)*Math.PI/180)},${250*Math.sin((rotate-90)*Math.PI/180)} A250,250 0 0,1 ${250*Math.cos((rotate+sliceAngle-90)*Math.PI/180)},${250*Math.sin((rotate+sliceAngle-90)*Math.PI/180)} Z`);
  path.setAttribute("class","slice-color");
  path.setAttribute("fill",i%2==0?"#2563EB":"#1E40AF");
  wheel.appendChild(path);

  const text = document.createElementNS("http://www.w3.org/2000/svg","text");
  text.setAttribute("x",x); text.setAttribute("y",y);
  text.setAttribute("text-anchor","middle"); text.setAttribute("alignment-baseline","middle");
  text.textContent = prizes[i];
  wheel.appendChild(text);
}

let currentRotation = 0;
const spinBtn = document.getElementById("spinBtn");
const resultEl = document.getElementById("result");
const timerEl = document.getElementById("timer");

function startCountdown(duration){
  let endTime = Date.now()+duration;
  const interval = setInterval(()=>{
    let remaining = endTime - Date.now();
    if(remaining<=0){ 
      clearInterval(interval); 
      spinBtn.disabled=false; 
      timerEl.textContent=""; 
      localStorage.removeItem("lastSpin"); 
    }
    else{
      let hrs = Math.floor(remaining/(1000*60*60));
      let mins = Math.floor((remaining%(1000*60*60))/(1000*60));
      let secs = Math.floor((remaining%(1000*60))/1000);
      timerEl.textContent = `⏳ تا چرخش بعدی: ${hrs}ساعت ${mins}دقیقه ${secs}ثانیه`;
    }
  },1000);
}

spinBtn.addEventListener("click",()=>{
  spinBtn.disabled = true;
  const prizeIndex = Math.floor(Math.random() * prizes.length);
  const targetRotation = 360*5 + (360 - prizeIndex*sliceAngle - sliceAngle/2);
  currentRotation += targetRotation;
  document.querySelector(".wheel").style.transform = `rotateY(${currentRotation}deg) rotateX(10deg)`;
  setTimeout(()=>{ resultEl.textContent = `🎉 جایزه شما: ${prizes[prizeIndex]}`; }, 5000);
  localStorage.setItem("lastSpin", Date.now());
  startCountdown(24*60*60*1000);
});

const lastSpin = localStorage.getItem("lastSpin");
if(lastSpin){
  const elapsed = Date.now() - parseInt(lastSpin);
  if(elapsed < 24*60*60*1000){
    spinBtn.disabled = true;
    startCountdown(24*60*60*1000 - elapsed);
  } else { spinBtn.disabled = false; }
} else { spinBtn.disabled = false; }
