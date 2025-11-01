function sendMessage(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  e.target.reset();

  const popup = document.getElementById('popup');
  popup.classList.add('show');

  // Hide popup after 4 seconds
  setTimeout(() => {
    popup.classList.remove('show');
  }, 4000);
}
