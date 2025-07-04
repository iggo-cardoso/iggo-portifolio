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