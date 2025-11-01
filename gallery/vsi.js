 const imageData = [
      // 🛕 TEMPLE SECTION
  { src: "a1.png", title: "🛕 Temple", desc: "The sacred Vitthal–Rakhumai Temple of Rajapur stands as a symbol of faith and devotion." },
  { src: "a3.png", title: "Temple Outside View", desc: "A peaceful glimpse of the temple’s grand exterior, glowing with devotion and surrounded by divine serenity." },
  { src: "a4.jpg", title: "Temple Inside View", desc: "The inner sanctum radiates divine energy, where devotees bow with faith before Lord Vitthal and Goddess Rakhumai." },

  // 🎉 CELEBRATION SECTION
  { src: "a2.png", title: "🎉 Festival", desc: "A vibrant celebration of faith and togetherness, where music, lights, and devotion fill the temple with joy." },
  { src: "a5.png", title: "Celebration", desc: "Devotees unite in joy and devotion during vibrant Kartiki Ekadashi festivities filled with bhajans, lights, and prayers." },

  // 👨‍👩‍👧‍👦 COMMUNITY SECTION
  { src: "a6.jpg", title: "Devotees", desc: "Faith binds community." },

  // 🌸 DECORATIONS SECTION
  { src: "a1.png", title: "Alankar", desc: "Divine decorations." },

  // 🎶 BHAJAN SECTION
  { src: "a7.jpg", title: "Bhajan", desc: "Songs & devotion." },
  { src: "a8.jpg", title: "Dindi", desc: "A traditional Varkari procession symbolizing devotion and unity." },

  // 🪔 VIDEOS SECTION (you can use video thumbnail here)
  { src: "a9.jpg", title: "Aarti Highlights", desc: "Evening aarti clip." }

  ];

  const mainImage = document.getElementById('mainImage');
  const thumbWrapper = document.getElementById('thumbWrapper');
  const textOverlay = document.getElementById('textOverlay');

  imageData.forEach((item, i) => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.dataset.index = i;
    slide.innerHTML = `<img src="${item.src}" alt="thumb-${i}" />`;
    thumbWrapper.appendChild(slide);
  });

  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 'auto',
    spaceBetween: 12,
    loop: false,
    allowTouchMove: true
  });

  const thumbs = Array.from(document.querySelectorAll('.swiper-slide'));
  let currentIndex = 0;

  function setMain(index) {
    mainImage.src = imageData[index].src;
    textOverlay.querySelector('h2').textContent = imageData[index].title;
    textOverlay.querySelector('p').textContent = imageData[index].desc;
    textOverlay.classList.add('active');
  }

  setMain(currentIndex);
  thumbs[currentIndex].classList.add('active');

  function createCloneFromElement(el) {
    const img = el.querySelector('img');
    const rect = img.getBoundingClientRect();
    const clone = img.cloneNode(true);
    Object.assign(clone.style, {
      position: 'fixed',
      left: rect.left + 'px',
      top: rect.top + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
      margin: 0,
      zIndex: 9999,
      borderRadius: getComputedStyle(img).borderRadius
    });
    document.body.appendChild(clone);
    return clone;
  }

  function animateThumbToMain(thumbEl, targetIndex) {
    const clone = createCloneFromElement(thumbEl);
    const mainRect = mainImage.getBoundingClientRect();
    textOverlay.classList.remove('active');

    gsap.set(mainImage, { opacity: 0 });
    gsap.to(clone, {
      left: mainRect.left,
      top: mainRect.top,
      width: mainRect.width,
      height: mainRect.height,
      borderRadius: '0px',
      duration: 1,
      ease: 'power3.inOut',
      onComplete: () => {
        setMain(targetIndex);
        gsap.to(mainImage, { opacity: 1, duration: 0.4 });
        clone.remove();
      }
    });
  }

  function animateMainToThumb(thumbEl, targetIndex) {
    const clone = mainImage.cloneNode(true);
    const rect = mainImage.getBoundingClientRect();
    Object.assign(clone.style, {
      position: 'fixed',
      left: rect.left + 'px',
      top: rect.top + 'px',
      width: rect.width + 'px',
      height: rect.height + 'px',
      zIndex: 9999
    });
    document.body.appendChild(clone);

    const thumbRect = thumbEl.querySelector('img').getBoundingClientRect();
    textOverlay.classList.remove('active');

    gsap.set(mainImage, { opacity: 0 });
    gsap.to(clone, {
      left: thumbRect.left,
      top: thumbRect.top,
      width: thumbRect.width,
      height: thumbRect.height,
      borderRadius: '8px',
      duration: 1,
      ease: 'power3.inOut',
      onComplete: () => {
        setMain(targetIndex);
        gsap.to(mainImage, { opacity: 1, duration: 0.4 });
        clone.remove();
      }
    });
  }

  function goToIndex(nextIndex, direction = 'next') {
    if (nextIndex === currentIndex) return;
    thumbs.forEach(t => t.classList.remove('active'));
    const targetThumb = thumbs[nextIndex];
    direction === 'next'
      ? animateThumbToMain(targetThumb, nextIndex)
      : animateMainToThumb(targetThumb, nextIndex);
    thumbs[nextIndex].classList.add('active');
    currentIndex = nextIndex;
    swiper.slideTo(nextIndex, 400, false);
  }

  thumbs.forEach((slide, i) =>
    slide.addEventListener('click', () => {
      goToIndex(i, i > currentIndex ? 'next' : 'prev');
      restartAuto();
    })
  );

  document.getElementById('nextBtn').addEventListener('click', () => {
    const ni = (currentIndex + 1) % imageData.length;
    goToIndex(ni, 'next');
    restartAuto();
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    const pi = (currentIndex - 1 + imageData.length) % imageData.length;
    goToIndex(pi, 'prev');
    restartAuto();
  });

  let autoLoop = setInterval(() => {
    const ni = (currentIndex + 1) % imageData.length;
    goToIndex(ni, 'next');
  }, 5000);

  function restartAuto() {
    clearInterval(autoLoop);
    autoLoop = setInterval(() => {
      const ni = (currentIndex + 1) % imageData.length;
      goToIndex(ni, 'next');
    }, 5000);
  }