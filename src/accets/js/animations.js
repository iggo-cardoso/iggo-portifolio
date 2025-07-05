function updateProgressiveElements() {
  const elements = document.querySelectorAll(".progressive");
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const rect = el.getBoundingClientRect();

    // Cálculo de quanto do elemento está visível
    const visibleTop = Math.max(0, rect.top);
    const visibleBottom = Math.min(windowHeight, rect.bottom);
    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    const totalHeight = Math.min(rect.height, windowHeight);
    const progress = Math.min(1, visibleHeight / totalHeight);

    el.style.setProperty("--progress", progress.toFixed(3));
 });
}

window.addEventListener("scroll", updateProgressiveElements);
window.addEventListener("resize", updateProgressiveElements);
window.addEventListener("load", updateProgressiveElements);
//


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
        o: Math.random() // opacidade
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

    let speed = 5;

    function animate() {
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
    
        if (star.z <= 0) {
          star.z = w;
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
    
      // Desaceleração gradual
      if (speed > 0.3) {
        speed -= 0.03;
      }
    
      requestAnimationFrame(animate);
    }
    animate();