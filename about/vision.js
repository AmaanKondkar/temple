const cardSection = document.querySelector('.animated-cards-section');
if (cardSection) {
  const cards = cardSection.querySelectorAll('.card');
  let index = 0;

  function activateCard() {
    cards.forEach((card, i) => card.classList.toggle('active', i === index));
    index = (index + 1) % cards.length;
  }

  // Continuous loop without pause
  setInterval(activateCard, 3000);

  // Initial activation
  activateCard();
}
