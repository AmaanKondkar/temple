// events.js — robust drop-in (replace your old file with this)

document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const events = Array.from(document.querySelectorAll(".event"));
  const timeline = document.querySelector(".timeline");
  const toggle = document.getElementById("togglePast");
  const modal = document.getElementById("pastModal");
  const overlay = document.getElementById("overlay");
  const closeBtn = document.getElementById("close");
  const cancelBtn = document.getElementById("cancel");

  // --- Helper: safe log for debugging ---
  function L(...args) {
    // uncomment next line to see logs in console while debugging
    // console.log("[events.js]", ...args);
  }

  // --- Update vertical line height so it reaches the last event ---
  function updateLineHeight() {
    if (!timeline || events.length === 0) return;
    const last = events[events.length - 1];
    // compute height relative to timeline container
    const height = last.offsetTop + last.offsetHeight;
    timeline.style.setProperty("--lineHeight", `${height}px`);
    L("lineHeight set to", height);
  }

  // --- GSAP animation loop (if GSAP available) ---
  function playAnimation() {
    if (typeof gsap === "undefined") {
      // fallback: simply show events if GSAP not loaded
      events.forEach((el) => {
        el.style.opacity = 1;
        el.style.transform = "translateY(0) scale(1)";
      });
      updateLineHeight();
      return;
    }

    gsap.set(events, { opacity: 0, y: 80, scale: 0.95 });
    gsap.to(events, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "bounce.out",
      stagger: 0.8,
      onComplete: () => {
        updateLineHeight();
        // do not auto-restart too aggressively; run once is enough for page
      }
    });
  }

  // --- Modal open/close helpers ---
  function openModal() {
    if (!overlay || !modal) return;
    overlay.style.display = "block";
    modal.style.display = "block";
    // ensure top-most
    overlay.style.zIndex = "9999";
    modal.style.zIndex = "10000";

    if (typeof gsap !== "undefined") {
      gsap.fromTo(modal, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.28, ease: "power2.out" });
    } else {
      modal.style.opacity = 1;
    }
  }

  function closeModal() {
    if (!overlay || !modal) return;
    if (typeof gsap !== "undefined") {
      gsap.to(modal, {
        opacity: 0,
        scale: 0.96,
        duration: 0.22,
        onComplete: () => {
          modal.style.display = "none";
          overlay.style.display = "none";
        }
      });
    } else {
      modal.style.display = "none";
      overlay.style.display = "none";
    }
  }

  // --- Attach listeners (guarded) ---
  if (toggle) {
    toggle.addEventListener("click", (e) => {
      e.preventDefault();
      openModal();
    });
  } else {
    L("togglePast button not found. Check HTML id='togglePast'");
  }

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  // If modal is opened via other code, observe visibility changes and update line
  // Also recalc on resize and images loaded
  window.addEventListener("resize", updateLineHeight);
  window.addEventListener("load", () => {
    playAnimation();
    updateLineHeight();
  });

  // If DOM changes (events added/removed), recalc
  if (timeline && window.MutationObserver) {
    const mo = new MutationObserver(() => {
      // refresh events list
      const newEvents = Array.from(document.querySelectorAll(".event"));
      if (newEvents.length !== events.length) {
        // replace contents of events array in-place
        events.length = 0;
        newEvents.forEach(e => events.push(e));
      }
      updateLineHeight();
    });
    mo.observe(timeline, { childList: true, subtree: true });
  }

  // Final safety call
  setTimeout(updateLineHeight, 300);
});
