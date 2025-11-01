
document.addEventListener('DOMContentLoaded', () => {
  const el = document.querySelector('.auto-text');
  if (!el) {
    console.error('auto-text element not found. Check that .auto-text exists in HTML.');
    return;
  }

  const text = "Rajapur is a beautiful and spiritually blessed village located in the heart of Maharashtra. Surrounded by lush green fields, serene hills, and the calm rhythm of rural life, Rajapur radiates peace, devotion, and togetherness. It is home to generations of devotees who have carried forward the legacy of faith, culture, and unity for decades. The village’s identity is deeply rooted in the worship of Lord Vitthal and Goddess Rakhumai, whose temple stands as the divine center of spiritual and cultural life. Every day, the sound of bhajans, the fragrance of incense, and the devotion of the villagers fill the temple atmosphere with sacred energy.During Kartiki Ekadashi, Rajapur transforms into a vibrant spiritual destination where thousands of devotees from nearby regions gather to celebrate with great enthusiasm. The village comes alive with colorful decorations, soulful bhajans, processions, and grand aartis that reflect deep devotion and harmony. The glowing lamps, chants of “Vithoba Rakhumai,” and joyful participation of the villagers create an atmosphere of pure divinity. Beyond its religious significance, Rajapur is also known for its warm hospitality, simple lifestyle, and commitment to preserving its cultural heritage. It stands as a living example of faith, unity, and the eternal bond between the people and their beloved deities — Lord Vitthal and Goddess Rakhumai.";
  let i = 0;
  const typingSpeed = 35; // ms per char (fast)
  const pauseAfterComplete = 3000; // 3s pause

  // ensure visible styling in case color/overlay hides it
  el.style.opacity = '1';
  el.style.transition = 'opacity 300ms ease';

  function type() {
    // build string incrementally
    i = 0;
    el.textContent = '';
    el.style.opacity = '1';

    function step() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(step, typingSpeed);
      } else {
        // after complete, wait then fade out and restart
        setTimeout(() => {
          el.style.opacity = '0';
          setTimeout(() => {
            el.textContent = '';
            el.style.opacity = '1';
            setTimeout(type, 200); // small delay before retyping
          }, 300); // fade duration
        }, pauseAfterComplete);
      }
    }
    step();
  }

  type();
});

