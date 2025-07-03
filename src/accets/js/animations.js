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
