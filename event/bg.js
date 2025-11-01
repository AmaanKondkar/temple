// ================================
// STAR BACKGROUND ANIMATION ONLY
// ================================

const wrapper = document.getElementById("animated-bg");

/* ================================
   STARS (FULL PAGE)
================================*/
function createStars() {
  const numStars = 200;

  // Calculate full scrollable height
  const pageHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 6 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";
    star.style.top = Math.random() * pageHeight + "px"; // entire document
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDuration = (0.8 + Math.random() * 1.5) + "s";
    wrapper.appendChild(star);
  }
}

createStars();

// Regenerate stars when page resizes
window.addEventListener("resize", () => {
  document.querySelectorAll(".star").forEach(s => s.remove());
  createStars();
});

/* ================================
   SHOOTING STARS (FULL PAGE)
================================*/
function createShootingStar() {
  const star = document.createElement("div");
  star.classList.add("shooting-star");

  const pageHeight = Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  );

  star.style.top = Math.random() * pageHeight + "px";
  star.style.left = Math.random() * 100 + "vw";
  wrapper.appendChild(star);

  setTimeout(() => star.remove(), 1000);
}

setInterval(() => {
  if (Math.random() > 0.6) {
    createShootingStar();
  }
}, 800);
