// ===========================
// Donation Circle Animation
// ===========================
const progressCircle = document.querySelector('.progress');
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

const donationEl = document.getElementById("donationAmount");
const goal = 10; // in Lakh

function animateDonation() {
  let start = 0;
  let end = 2.5; // current raised amount
  let duration = 2500;
  let startTime = null;

  function step(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = (progress * (end - start) + start).toFixed(1);
    donationEl.textContent = `₹${value} Lakh`;

    const percent = (value / goal) * 100;
    const offset = circumference - (percent / 100) * circumference;
    progressCircle.style.strokeDashoffset = offset;

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      setTimeout(animateDonation, 6000); // wait 6s before repeating
    }
  }

  requestAnimationFrame(step);
}

animateDonation();
