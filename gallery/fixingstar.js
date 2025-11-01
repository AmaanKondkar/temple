
document.addEventListener('DOMContentLoaded', () => {
  const bg = document.getElementById('animated-bg');
  if (!bg) return;

  // remove any previously appended stars (safe-reload)
  Array.from(bg.querySelectorAll('.star, .shooting-star')).forEach(n => n.remove());

  // create stars
  const starCount = 80;
  for (let i = 0; i < starCount; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.random() * 2 + 1;
    s.style.width = s.style.height = size + 'px';
    s.style.left = (Math.random() * 100) + '%';
    s.style.top = (Math.random() * 100) + '%';
    s.style.animationDelay = (Math.random() * 2) + 's';
    s.style.opacity = (0.3 + Math.random() * 0.7);
    bg.appendChild(s);
  }

  // occasional shooting star
  setInterval(() => {
    const ss = document.createElement('div');
    ss.className = 'shooting-star';
    ss.style.left = (20 + Math.random() * 60) + '%';
    ss.style.top = (10 + Math.random() * 40) + '%';
    bg.appendChild(ss);
    // remove it after animation finishes
    setTimeout(() => ss.remove(), 1200);
  }, 3000 + Math.random() * 2500);
});

