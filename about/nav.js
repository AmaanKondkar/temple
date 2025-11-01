/* ================================
     MOBILE MENU TOGGLE
  =================================*/
  let isMenuOpen = false;
  function toggleMobileMenu() {
    const menu = document.getElementById("mobileMenu");
    const btn = document.getElementById("hamburgerBtn");
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
      menu.classList.add("show");
      btn.textContent = "✖";
    } else {
      menu.classList.remove("show");
      btn.textContent = "☰";
    }
  }