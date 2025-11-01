(function(){
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const sections = Array.from(document.querySelectorAll('.section'));
  const allBtn = document.getElementById('allBtn');

  const modalBackdrop = document.getElementById('modalBackdrop');
  const modal = modalBackdrop.querySelector('.modal');
  const modalMedia = document.getElementById('modalMedia');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalClose = document.getElementById('modalClose');
  const modalPrev = document.getElementById('modalPrev');
  const modalNext = document.getElementById('modalNext');

  const modalShareToggle = document.getElementById('modalShareToggle');
  const modalShareMenu = document.getElementById('modalShareMenu');
  const modalShareWhatsApp = document.getElementById('modalShareWhatsApp');
  const modalShareCopy = document.getElementById('modalShareCopy');

  const cardShareMenu = document.getElementById('cardShareMenu');
  const cardShareWhatsApp = document.getElementById('cardShareWhatsApp');
  const cardShareCopy = document.getElementById('cardShareCopy');

  const toast = document.getElementById('toast');

  // Build sections map
  function collect(sectionEl){
    return Array.from(sectionEl.querySelectorAll('.media-btn')).map(b => ({
      el: b,
      type: b.dataset.type || 'image',
      src: b.dataset.src || '',
      video: b.dataset.video || '',
      title: b.dataset.title || '',
      desc: b.dataset.desc || ''
    }));
  }

  const sectionMap = {};
  sections.forEach(s => sectionMap[s.id] = collect(s));
  function refreshMap(){ sections.forEach(s => sectionMap[s.id] = collect(s)); }

  // GSAP: switch sections
  function switchTo(id){
    const current = sections.find(s => s.classList.contains('active'));
    const next = document.getElementById(id);
    const curCards = current ? Array.from(current.querySelectorAll('.card')) : [];
    const nextCards = next ? Array.from(next.querySelectorAll('.card')) : [];

    next.classList.add('active');
    gsap.set(nextCards, {opacity:0, y:-40, scale:1.06});

    const tl = gsap.timeline();
    if(curCards.length){
      tl.to(curCards, {
        duration:0.45, opacity:0, y:-30, scale:1.18,
        stagger:{each:0.06, from:'end'}, ease:'power2.in',
        onComplete:()=> {
          if(current) current.classList.remove('active');
          curCards.forEach(c=>gsap.set(c, {clearProps:'all'}));
        }
      }, 0);
    }
    tl.to(nextCards, {
      duration:0.78, y:0, opacity:1, scale:1,
      stagger:{each:0.12, from:'start'}, ease:'back.out(1.6)'
    }, '>-0.02');
    tl.call(()=> { refreshMap(); attachHandlers(); }, null, '>');
  }

  // Initial animation
  function initial(){
    const active = sections.find(s => s.classList.contains('active')) || sections[0];
    const cards = Array.from(active.querySelectorAll('.card'));
    gsap.set(cards, {opacity:0, y:-36, scale:1.06});
    gsap.to(cards, { duration:0.9, y:0, opacity:1, scale:1, stagger:0.12, ease:'back.out(1.6)', delay:0.05 });
  }

  // Tabs
  tabs.forEach((t, idx) => {
    t.addEventListener('click', () => {
      tabs.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected','false'); });
      t.classList.add('active'); t.setAttribute('aria-selected','true');
      switchTo(t.dataset.section);
    });
    t.addEventListener('keydown', (e) => {
      if(e.key === 'ArrowRight') tabs[(idx+1)%tabs.length].focus();
      if(e.key === 'ArrowLeft') tabs[(idx-1+tabs.length)%tabs.length].focus();
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.click(); }
    });
  });

  // All button
  allBtn.addEventListener('click', ()=> {
    tabs.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected','false'); });
    const current = sections.find(s=>s.classList.contains('active'));
    const curCards = current ? Array.from(current.querySelectorAll('.card')) : [];
    const tl = gsap.timeline();
    if(curCards.length) tl.to(curCards, {duration:0.38, opacity:0, y:-18, stagger:0.04, ease:'power2.in'});
    tl.add(()=> {
      sections.forEach(s => s.classList.add('active'));
      const allCards = Array.from(document.querySelectorAll('.section.active .card'));
      gsap.set(allCards, {opacity:0, y:-36, scale:1.06});
      gsap.to(allCards, {duration:0.9, opacity:1, y:0, scale:1, stagger:0.06, ease:'back.out(1.6)'});
      refreshMap(); attachHandlers();
    }, '>-0.05');
  });

  // Modal
  let currentList = [];
  let currentIndex = 0;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  function openModalFor(btn){
    const activeSections = sections.filter(s => s.classList.contains('active'));
    currentList = activeSections.length > 1 ?
      [].concat(...activeSections.map(s => collect(s))) :
      sectionMap[btn.closest('.section')?.id] || [].concat(...Object.values(sectionMap));
    currentIndex = currentList.findIndex(it => it.el === btn);
    if(currentIndex < 0) currentIndex = currentList.findIndex(it => it.src === btn.dataset.src || it.video === btn.dataset.video);
    showItem(currentList[currentIndex]);
    modalBackdrop.classList.add('show'); modal.classList.add('show'); modalBackdrop.setAttribute('aria-hidden','false');
    gsap.fromTo(modal, {y:20, scale:0.98, opacity:0}, {y:0, scale:1, opacity:1, duration:0.36, ease:'power3.out'});
    modalClose.focus();
    document.addEventListener('focus', trapFocus, true);
  }

  function showItem(item){
    if(!item) return;
    modalMedia.innerHTML = '';
    modalTitle.textContent = item.title || '';
    modalDesc.textContent = item.desc || '';
    if(item.type === 'video' && item.video){
      const v = document.createElement('video'); v.controls=true; v.src=item.video; v.setAttribute('playsinline',''); v.style.maxWidth='100%'; v.style.maxHeight='70vh';
      modalMedia.appendChild(v); v.play().catch(()=>{});
    } else {
      const img = document.createElement('img'); img.src = item.src || item.el.querySelector('img')?.src || ''; img.alt = item.title || '';
      modalMedia.appendChild(img);
    }
    updateNav();
    gsap.fromTo(modalMedia.children[0], {scale:0.96, opacity:0}, {scale:1, opacity:1, duration:0.42, ease:'power3.out'});
  }

  function updateNav(){
    modalPrev.disabled = currentIndex <= 0;
    modalNext.disabled = currentIndex >= currentList.length - 1;
  }

  // Attach handlers
  let hoverTimer = null;
  const hoverDelay = 4000;

  function attachHandlers(){
    const mediaBtns = Array.from(document.querySelectorAll('.media-btn'));
    mediaBtns.forEach(btn => {
      if (!btn._bound) {
        btn._bound = true;
        btn.addEventListener('click', (e) => { e.preventDefault(); openModalFor(btn); });
        if(!isTouch){
          btn.addEventListener('mouseenter', () => { hoverTimer = setTimeout(()=> openModalFor(btn), hoverDelay); });
          btn.addEventListener('mouseleave', () => { if(hoverTimer){ clearTimeout(hoverTimer); hoverTimer=null; } });
        }
      }
    });

    document.querySelectorAll('.share-out').forEach(el => {
      if(!el._bound){
        el._bound=true;
        el.addEventListener('click', (e)=>{
          e.stopPropagation();
          const btn = el.closest('.card')?.querySelector('.media-btn');
          if(!btn) return;
          const rect = el.getBoundingClientRect();
          const menu = cardShareMenu;
          menu.style.left = (rect.left + window.scrollX - 12) + 'px';
          menu.style.top  = (rect.top + window.scrollY - 64) + 'px';
          menu.style.display='block';
          menu.setAttribute('aria-hidden','false');
          menu._targetBtn = btn;
          menu.style.zIndex = 9999; // ensure above all
        });
      }
    });
  }

  attachHandlers();

  // Modal navigation
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => { if(e.target===modalBackdrop) closeModal(); });
  modalPrev.addEventListener('click', ()=> { if(currentIndex>0){ currentIndex--; showItem(currentList[currentIndex]); } });
  modalNext.addEventListener('click', ()=> { if(currentIndex<currentList.length-1){ currentIndex++; showItem(currentList[currentIndex]); } });

  function closeModal(){
    const v = modalMedia.querySelector('video'); if(v) v.pause();
    gsap.to(modal, {y:12, scale:0.98, opacity:0, duration:0.28, ease:'power2.in', onComplete: ()=> {
      modalBackdrop.classList.remove('show'); modal.classList.remove('show'); modalBackdrop.setAttribute('aria-hidden','true'); modalMedia.innerHTML='';
    }});
    document.removeEventListener('focus', trapFocus, true);
  }

  document.addEventListener('keydown', (e)=>{
    if(modalBackdrop.classList.contains('show')){
      if(e.key==='Escape') closeModal();
      if(e.key==='ArrowLeft') modalPrev.click();
      if(e.key==='ArrowRight') modalNext.click();
    }
  });

  function trapFocus(e){ if(!modalBackdrop.classList.contains('show')) return; if(!modal.contains(e.target)){ e.stopPropagation(); modalClose.focus(); } }

  // Modal share
  modalShareToggle.addEventListener('click', (e)=>{
    e.stopPropagation();
    const shown = modalShareMenu.classList.contains('show');
    document.querySelectorAll('.share-bubble').forEach(m => m.classList.remove('show'));
    if(!shown) modalShareMenu.classList.add('show');
  });

  // Click outside to close share menus
  document.addEventListener('click', (e)=>{
    if(!modal.contains(e.target)) modalShareMenu.classList.remove('show');
    if(!cardShareMenu.contains(e.target)) { cardShareMenu.style.display='none'; cardShareMenu._targetBtn=null; }
  });

  // Share actions
  modalShareWhatsApp.addEventListener('click', ()=> {
    const item = currentList[currentIndex];
    const url = item && (item.src||item.video) ? (item.src||item.video) : window.location.href;
    const text = encodeURIComponent((item && item.title ? item.title+' - ' : '') + url);
    window.open('https://wa.me/?text=' + text, '_blank');
  });

  modalShareCopy.addEventListener('click', async ()=>{
    const item = currentList[currentIndex];
    const url = item && (item.src||item.video) ? (item.src||item.video) : window.location.href;
    try { await navigator.clipboard.writeText(url); showToast('Link copied'); modalShareMenu.classList.remove('show'); } 
    catch(err){ console.error(err); showToast('Copy failed'); }
  });

  cardShareWhatsApp.addEventListener('click', ()=>{
    const menu = cardShareMenu; const target = menu._targetBtn;
    if(!target) return;
    const src = target.dataset.src || target.dataset.video || window.location.href;
    const title = target.dataset.title || '';
    window.open('https://wa.me/?text=' + encodeURIComponent((title ? title+' - ' : '')+src), '_blank');
    menu.style.display='none';
  });

  cardShareCopy.addEventListener('click', async ()=>{
    const menu = cardShareMenu; const target = menu._targetBtn;
    if(!target) return;
    const src = target.dataset.src || target.dataset.video || window.location.href;
    try { await navigator.clipboard.writeText(src); showToast('Link copied'); menu.style.display='none'; } 
    catch(err){ console.error(err); showToast('Copy failed'); menu.style.display='none'; }
  });

  function showToast(msg='Done'){
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 1600);
  }

  window.addEventListener('load', ()=> { initial(); attachHandlers(); });

})();
