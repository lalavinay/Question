/* ===============================
   ELEMENTS
================================ */
const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");
const yt = document.getElementById("ytMusic");

/* ===============================
   NO BUTTON – NEVER CLICKABLE
================================ */
function moveNo() {
  const x = Math.random() * (window.innerWidth - 120);
  const y = Math.random() * (window.innerHeight - 120);
  noBtn.style.position = "fixed";
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}
noBtn.addEventListener("mouseenter", moveNo);
noBtn.addEventListener("touchstart", moveNo);

/* ===============================
   BACKGROUND FLOATING HEARTS
================================ */
const bgCanvas = document.getElementById("bgCanvas");
const bgCtx = bgCanvas.getContext("2d");

function resizeBG() {
  bgCanvas.width = innerWidth;
  bgCanvas.height = innerHeight;
}
resizeBG();
window.addEventListener("resize", resizeBG);

const bgHearts = [];
const heartEmojis = ["💗","💖","💕","💘","❤️"];

setInterval(() => {
  bgHearts.push({
    x: Math.random() * bgCanvas.width,
    y: bgCanvas.height + 30,
    size: Math.random() * 18 + 18,
    speed: Math.random() * 0.6 + 0.4,
    emoji: heartEmojis[Math.floor(Math.random() * heartEmojis.length)]
  });
}, 350);

function animateBG() {
  bgCtx.clearRect(0,0,bgCanvas.width,bgCanvas.height);
  bgHearts.forEach((h,i)=>{
    bgCtx.font = ${h.size}px serif;
    bgCtx.fillText(h.emoji, h.x, h.y);
    h.y -= h.speed;
    if (h.y < -50) bgHearts.splice(i,1);
  });
  requestAnimationFrame(animateBG);
}
animateBG();

/* ===============================
   CONFETTI BURST (YES CLICK)
================================ */
const confettiCanvas = document.getElementById("confettiCanvas");
const confCtx = confettiCanvas.getContext("2d");

function resizeConfetti() {
  confettiCanvas.width = innerWidth;
  confettiCanvas.height = innerHeight;
}
resizeConfetti();
window.addEventListener("resize", resizeConfetti);

let particles = [];

function createConfetti(x,y) {
  for(let i=0;i<40;i++){
    particles.push({
      x,y,
      vx:(Math.random()-0.5)*8,
      vy:(Math.random()-1)*8,
      size:Math.random()*6+4,
      alpha:1,
      color:["#ff5aa3","#ff3f8e","#ff90c9","#ff7cc2"][Math.floor(Math.random()*4)]
    });
  }
}

function animateConfetti(){
  confCtx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);
  particles.forEach((p,i)=>{
    p.x+=p.vx;
    p.y+=p.vy;
    p.vy+=0.15;
    p.alpha-=0.02;

    confCtx.globalAlpha=p.alpha;
    confCtx.fillStyle=p.color;
    confCtx.fillRect(p.x,p.y,p.size,p.size);
    confCtx.globalAlpha=1;

    if(p.alpha<=0) particles.splice(i,1);
  });
  requestAnimationFrame(animateConfetti);
}
animateConfetti();

/* ===============================
   YES BUTTON ACTION
================================ */
let yesScale = 1;
let musicPlayed = false;

yesBtn.addEventListener("click",()=>{
  yesScale += 0.25;
  yesBtn.style.transform = scale(${yesScale});

  const r = yesBtn.getBoundingClientRect();
  createConfetti(r.left + r.width/2, r.top + r.height/2);

  if(!musicPlayed){
    yt.src = "https://www.youtube.com/watch?v=MRtRcTfszjY&list=RDMRtRcTfszjY&start_radio=1";
    musicPlayed = true;
  }
});
