// ===== Email Popup Script =====
(function () {
  const DELAY_MS = 5000; // Show after 5 seconds
  const backdrop = document.getElementById('emailModalBackdrop');
  const closeX = document.getElementById('closeX');
  const cancelBtn = document.getElementById('cancelBtn');
  const form = document.getElementById('emailForm');
  const emailInput = document.getElementById('emailInput');
  const errorMsg = document.getElementById('errorMsg');
  const mailtoLink = document.getElementById('mailtoLink');

  let lastFocused = null;

  function showModal() {
    lastFocused = document.activeElement;
    backdrop.classList.add('show');
    emailInput.value = '';
    errorMsg.style.display = 'none';
    emailInput.focus();
    document.addEventListener('keydown', onKeyDown);
  }

  function hideModal() {
    backdrop.classList.remove('show');
    document.removeEventListener('keydown', onKeyDown);
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  }

  function onKeyDown(e) {
    if (e.key === 'Escape') hideModal();
    trapFocus(e);
  }

  function trapFocus(e) {
    const focusable = backdrop.querySelectorAll('a, button, input, [tabindex]:not([tabindex="-1"])');
    if (!backdrop.classList.contains('show')) return;
    if (!focusable.length) return;
    if (!backdrop.contains(document.activeElement)) focusable[0].focus();
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    errorMsg.style.display = 'none';
    const email = emailInput.value.trim();

    if (!isValidEmail(email)) {
      errorMsg.textContent = 'Please enter a valid email address.';
      errorMsg.style.display = 'block';
      emailInput.focus();
      return;
    }

    const saved = JSON.parse(sessionStorage.getItem('collectedEmails_local')) || [];
    saved.push({ email, ts: new Date().toISOString() });
    sessionStorage.setItem('collectedEmails_local', JSON.stringify(saved));

    alert('Thanks for your email! Your email was saved in this session.');
    hideModal();
  });

  closeX.addEventListener('click', hideModal);
  cancelBtn.addEventListener('click', hideModal);

  setTimeout(() => {
    if (document.visibilityState === 'visible') {
      showModal();
    }
  }, DELAY_MS);
})();
