// ===== Count-Up Animation with Pause =====
function animateNumber(elementId, start, end, duration, pause) {
  const element = document.getElementById(elementId);

  function runCount() {
    let startTime = null;

    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value + (elementId === "devoteeCount" ? "+" : "");
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setTimeout(runCount, pause);
      }
    }

    requestAnimationFrame(step);
  }

  runCount();
}

// Start counting animations
animateNumber("yearsCount", 0, 50, 2500, 6000);
animateNumber("devoteeCount", 0, 10000, 3000, 6000);

// ===== Donation Progress Animation =====
const progressCircle = document.querySelector('.progress');
if (progressCircle) {
  const radius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * radius;
  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;

  const donationEl = document.getElementById("donationAmount");
  const goal = 10; // ₹10 Lakh goal

  function animateDonation() {
    let start = 0;
    let end = 2.5;
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
        setTimeout(animateDonation, 6000);
      }
    }

    requestAnimationFrame(step);
  }

  animateDonation();
}
