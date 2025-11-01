const marqueeTrack = document.getElementById('marqueeTrack');
const cards = document.querySelectorAll('.event-card');

cards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  card.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
});
