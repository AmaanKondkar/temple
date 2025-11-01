// ================================
// HERO TEXT ANIMATION
// ================================
document.addEventListener("DOMContentLoaded", () => {
  const textEl = document.getElementById("hero-text");
  if (!textEl) {
    console.warn("hero-text element not found");
    return;
  }

  // Read raw HTML so we can detect <br>
  const raw = textEl.innerHTML;

  // Split on <br> (handles <br>, <br/> and <br />)
  const parts = raw.split(/<br\s*\/?>/i);

  // Clear element
  textEl.innerHTML = "";

  // Helper: convert normal space to non-breaking so consecutive spaces are preserved
  const toVisibleChar = (ch) => (ch === " " ? "\u00A0" : ch);

  // Build DOM: a DIV.line per original line, with spans for characters
  parts.forEach((line, lineIndex) => {
    const lineWrapper = document.createElement("div");
    lineWrapper.className = "hero-line";
    // keep trimming only ends, but preserve internal spaces
    // do not collapse multiple spaces — we convert them to &nbsp;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      const span = document.createElement("span");
      span.textContent = toVisibleChar(ch);
      // initial styles for animation safety
      span.style.opacity = "0";
      span.style.display = "inline-block";
      span.style.transform = "translateY(20px)";
      lineWrapper.appendChild(span);
    }

    textEl.appendChild(lineWrapper);
    // re-add <br> visually for layout except after last
    if (lineIndex < parts.length - 1) textEl.appendChild(document.createElement("br"));
  });

  // Wait until GSAP is available
  function startAnimation() {
    if (typeof gsap === "undefined") {
      // try again shortly if GSAP not loaded yet
      setTimeout(startAnimation, 50);
      return;
    }

    // Animate only spans inside hero-text
    gsap.to("#hero-text span", {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 1,
      ease: "back.out(1.5)",
      repeat: -1,
      yoyo: true
    });
  }

  startAnimation();
});
// ================================
// 3D CUBE ROTATION
// ================================
const cube = document.getElementById("cube");
const faces = ["front", "top", "back", "bottom"];
let index = 0;
setInterval(() => {
  index = (index + 1) % faces.length;
  const rotation = index * 90;
  cube.style.transform = `rotateX(-${rotation}deg)`;
}, 1500);
