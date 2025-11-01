// ================================
// Review System (Debug-Friendly)
// ================================

let reviews = [];
try {
  reviews = JSON.parse(localStorage.getItem('reviews')) || [];
} catch (e) {
  console.warn('Error parsing reviews from localStorage. Resetting.', e);
  reviews = [];
}

// Get elements
const reviewsContainer = document.getElementById('reviewsContainer');
const submitBtn = document.getElementById('submitReviewBtn');
const nameInput = document.getElementById('name');
const commentInput = document.getElementById('comment');
const canvas = document.getElementById('graphCanvas');

if (!reviewsContainer || !submitBtn || !nameInput || !commentInput || !canvas) {
  console.error('Missing required HTML elements. Check your IDs!');
}

// Star logic
let selectedRating = 0;
const stars = document.querySelectorAll('.star-input span');

if (!stars.length) console.warn('No stars detected! Make sure you have spans with class "star-input".');

stars.forEach(star => {
  const value = parseInt(star.dataset.value);
  if (!value) return;

  star.addEventListener('mouseenter', () => {
    stars.forEach(s => s.classList.remove('hover'));
    for (let i = 0; i < value; i++) stars[i].classList.add('hover');
  });

  star.addEventListener('mouseleave', () => {
    stars.forEach(s => s.classList.remove('hover'));
  });

  star.addEventListener('click', () => {
    selectedRating = value;
    stars.forEach(s => s.classList.remove('selected'));
    for (let i = 0; i < selectedRating; i++) stars[i].classList.add('selected');
  });
});

// Display reviews
function displayReviews() {
  if (!reviewsContainer) return;
  reviewsContainer.innerHTML = '';

  reviews.forEach(r => {
    const div = document.createElement('div');
    div.className = 'review';

    const starsDiv = document.createElement('div');
    starsDiv.className = 'star-rating';
    for (let i = 1; i <= 5; i++) {
      const s = document.createElement('span');
      s.textContent = '★';
      if (i <= r.rating) s.classList.add('filled');
      starsDiv.appendChild(s);
    }

    const nameEl = document.createElement('strong');
    nameEl.textContent = r.name;

    const commentEl = document.createElement('div');
    commentEl.className = 'reviewText';
    commentEl.textContent = r.comment;

    div.appendChild(nameEl);
    div.appendChild(starsDiv);
    div.appendChild(commentEl);
    reviewsContainer.appendChild(div);
  });
}

// Chart.js
let chart;
if (canvas) {
  const ctx = canvas.getContext('2d');
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['5★', '4★', '3★', '2★', '1★'],
      datasets: [{
        label: 'Number of Ratings',
        data: [0,0,0,0,0],
        backgroundColor: '#FF542F',
        borderRadius: 5,
        barThickness: 25
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { stepSize: 1, precision: 0 } },
        y: { grid: { display: false }, ticks: { color:'#333', font:{size:14, weight:'bold'} } }
      }
    }
  });
}

function updateGraph() {
  if (!chart) return;
  const counts = [0,0,0,0,0];
  reviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) counts[5 - r.rating]++;
  });
  chart.data.datasets[0].data = counts;
  chart.update();
}

// Submit review
submitBtn?.addEventListener('click', () => {
  const name = nameInput.value.trim();
  const comment = commentInput.value.trim();

  if (!name || !comment || selectedRating < 1 || selectedRating > 5) {
    alert('Please fill all fields and select a rating.');
    return;
  }

  reviews.push({ name, rating: selectedRating, comment });

  try {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  } catch (e) {
    console.warn('Failed to save to localStorage', e);
  }

  // Reset
  nameInput.value = '';
  commentInput.value = '';
  selectedRating = 0;
  stars.forEach(s => s.classList.remove('selected'));

  displayReviews();
  updateGraph();
});

// Initial load
displayReviews();
updateGraph();
