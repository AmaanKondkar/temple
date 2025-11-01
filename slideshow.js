// GSAP Photo Stack Animation
window.addEventListener("load", () => {
  const tl = gsap.timeline({ delay: 0.5 });

  // Photo from top
  tl.fromTo(".p1",
    { y: "-100vh", opacity: 0, rotation: -10 },
    { y: "0vh", opacity: 1, rotation: -5, duration: 1, ease: "bounce.out" }
  );

  // Photo from right
  tl.fromTo(".p2",
    { x: "100vw", opacity: 0, rotation: 15 },
    { x: "0", opacity: 1, rotation: 5, duration: 1, ease: "back.out(1.4)" },
    "+=0.3"
  );

  // Photo from left
  tl.fromTo(".p3",
    { x: "-100vw", opacity: 0, rotation: -20 },
    { x: "0", opacity: 1, rotation: -8, duration: 1, ease: "back.out(1.5)" },
    "+=0.3"
  );

  // Photo from bottom
  tl.fromTo(".p4",
    { y: "100vh", opacity: 0, rotation: 10 },
    { y: "0", opacity: 1, rotation: 8, duration: 1, ease: "bounce.out" },
    "+=0.3"
  );

  // Small bounce scale for all
  tl.to(".photo", {
    scale: 1.03,
    duration: 0.4,
    yoyo: true,
    repeat: 1,
    ease: "power1.inOut"
  });
});
