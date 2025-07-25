// AUTOBLUR PROGRESS ELEMENT
function updateProgressiveElements() {
  const elements = document.querySelectorAll(".progressive");
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();

    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(windowHeight, rect.bottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    const totalHeight = Math.min(rect.height, windowHeight);
    const visibilityRatio = visibleHeight / totalHeight;

    if (visibilityRatio >= 0.3) {
      el.style.setProperty("--progress", visibilityRatio.toFixed(3));
    } else {
      el.style.setProperty("--progress", "0");
    }
  });
}

window.addEventListener("scroll", updateProgressiveElements);
window.addEventListener("resize", updateProgressiveElements);
window.addEventListener("load", updateProgressiveElements);
// AUTOBLUR PROGRESS ELEMENT

// VISIBILITY OF ELEMENTS

// ANIMAÇÃO DE ESTRELAS DE FUNDO
const infoFixed = document.querySelector('.info-fixed');
const header = document.querySelector('header');

window.addEventListener('scroll', ()=> {
  if (scrollY > 40) {
    infoFixed.style.transform = 'translateY(-100%)';
    header.style.top = '0';
  } else if (scrollY == 0) {
    infoFixed.style.transform = 'translateY(0)';
    header.style.top = '13px';
  }
});
// VISIBILITY OF ELEMENTS

const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let w, h, centerX, centerY;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
  centerX = w / 2;
  centerY = h / 2;
}
resize();
window.addEventListener("resize", resize);

const numStars = 500;
for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * w - centerX,
    y: Math.random() * h - centerY,
    z: Math.random() * w,
    o: Math.random()
  });
}

let mouse = { x: 0, y: 0 };
document.addEventListener("mousemove", e => {
  mouse.x = e.clientX - centerX;
  mouse.y = e.clientY - centerY;
});
document.addEventListener("touchmove", e => {
  mouse.x = e.touches[0].clientX - centerX;
  mouse.y = e.touches[0].clientY - centerY;
}, { passive: true });

let speed = 2;
const minSpeed = 0.3;
const maxSpeed = 2;
let targetSpeed = minSpeed;

let lastScrollY = window.scrollY;
let accumulatedScrollDown = 0;
let accumulatedScrollUp = 0;

window.addEventListener("scroll", () => {
  const currentY = window.scrollY;
  const deltaY = currentY - lastScrollY;

  if (deltaY > 0) {
    accumulatedScrollDown += deltaY;
    accumulatedScrollUp = 0;

    if (accumulatedScrollDown >= 100) {
      targetSpeed = maxSpeed;
      accumulatedScrollDown = 0;
    }
  } else if (deltaY < 0) {
    accumulatedScrollUp += Math.abs(deltaY);
    accumulatedScrollDown = 0;

    if (accumulatedScrollUp >= 100) {
      targetSpeed = -maxSpeed;
      accumulatedScrollUp = 0;
    }
  }

  lastScrollY = currentY;
});

function updateSpeed() {
  const easing = 0.05;

  speed += (targetSpeed - speed) * easing;

  if (Math.abs(speed - targetSpeed) < 0.1 && targetSpeed !== minSpeed) {
    targetSpeed = minSpeed;
  }
}

function animate() {
  updateSpeed();

  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < stars.length; i++) {
    let star = stars[i];

    let dx = star.x - mouse.x;
    let dy = star.y - mouse.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
      star.x += dx / dist * 2;
      star.y += dy / dist * 2;
    }

    star.z -= speed;

    if (star.z <= 0 || star.z > w) {
      star.z = speed > 0 ? w : 0.1;
      star.x = Math.random() * w - centerX;
      star.y = Math.random() * h - centerY;
    }

    let k = 128.0 / star.z;
    let px = star.x * k + centerX;
    let py = star.y * k + centerY;

    if (px >= 0 && px <= w && py >= 0 && py <= h) {
      let size = (1 - star.z / w) * 2;
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${star.o})`;
      ctx.arc(px, py, size, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  requestAnimationFrame(animate);
}
animate();
// ANIMAÇÃO DE ESTRELAS DE FUNDO

// CARREGAMENTO DA PÁGINA
const loadingWall = document.querySelector('.loading');
const loadingWallAfter = document.querySelector('.loading:after');

setTimeout(function() {
  loadingWall.classList.add('hidden');
}, 2000);

// CARREGAMENTO DA PÁGINA

const card = document.getElementById("starfield");

if (
  typeof DeviceOrientationEvent !== "undefined" &&
  typeof DeviceOrientationEvent.requestPermission === "function"
) {
  DeviceOrientationEvent.requestPermission()
    .then((response) => {
      if (response === "granted") {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    })
    .catch(console.error);
} else {
  
  window.addEventListener("deviceorientation", handleOrientation);
}

function handleOrientation(event) {
  const { beta, gamma } = event;

  const clamp = (val, min, max) => Math.max(min, Math.min(max, val));

  const rotateX = clamp(beta - 90, -20, 20);   
  const rotateY = clamp(gamma, -20, 20);       

  card.style.transform = `
    rotateX(${rotateX * -1}deg)
    rotateY(${rotateY}deg)
  `;
}


const button = document.querySelector('.magic-button');
const light = button.querySelector('.light');

function updateLight(x, y) {
  const rect = button.getBoundingClientRect();
  const posX = x - rect.left;
  const posY = y - rect.top;

  light.style.left = `${posX}px`;
  light.style.top = `${posY}px`;
}


button.addEventListener('mousemove', (e) => {
  updateLight(e.clientX, e.clientY);
});


button.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    const touch = e.touches[0];
    updateLight(touch.clientX, touch.clientY);
  }
});
