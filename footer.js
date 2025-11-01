// Adjust animation speed dynamically (optional)
document.querySelectorAll('.ball').forEach((ball, index) => {
  const duration = 15 + index * 2; // seconds
  ball.style.animationDuration = duration + 's';
});
