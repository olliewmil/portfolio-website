document.addEventListener('DOMContentLoaded',function(){
  const siteHeader = document.querySelector('.site-header');
  const backToTop = document.querySelector('.back-to-top');
  const yearEl = document.querySelector('#year');

  if(yearEl){
    yearEl.textContent = new Date().getFullYear();
  }

  // Nav toggle for small screens
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');
  if(navToggle && nav){
    navToggle.addEventListener('click',()=>{
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  // Sticky header + back-to-top state
  function onScrollUpdate(){
    const pastFold = window.scrollY > 24;
    if(siteHeader){
      siteHeader.classList.toggle('scrolled', pastFold);
    }
    if(backToTop){
      backToTop.classList.toggle('show', window.scrollY > 600);
    }
  }

  onScrollUpdate();
  window.addEventListener('scroll', onScrollUpdate, { passive: true });

  // Simple reveal animation for sections
  const revealItems = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealItems.length){
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item)=>observer.observe(item));
  }else{
    revealItems.forEach((item)=>item.classList.add('visible'));
  }

  // Lightbox for gallery images
  const mediaItems = Array.from(document.querySelectorAll('.media-item img'));
  if(mediaItems.length){
    let currentIndex = -1;
    const overlay = document.createElement('div');
    overlay.className = 'lb-overlay';
    overlay.style.display = 'none';

    const content = document.createElement('div');
    content.className = 'lb-content';

    const img = document.createElement('img');
    img.alt = '';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'lb-close';
  closeBtn.setAttribute('aria-label', 'Close image viewer');
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click',hideOverlay);

    const navWrap = document.createElement('div');
    navWrap.className = 'lb-nav';
    const prevBtn = document.createElement('button');
    prevBtn.setAttribute('aria-label', 'Previous image');
    prevBtn.innerHTML = '‹';
    const nextBtn = document.createElement('button');
    nextBtn.setAttribute('aria-label', 'Next image');
    nextBtn.innerHTML = '›';
    prevBtn.addEventListener('click',showPrev);
    nextBtn.addEventListener('click',showNext);
    navWrap.appendChild(prevBtn);
    navWrap.appendChild(nextBtn);

    content.appendChild(img);
    content.appendChild(closeBtn);
    content.appendChild(navWrap);
    overlay.appendChild(content);
    document.body.appendChild(overlay);

    function showOverlay(index){
      currentIndex = index;
      img.src = mediaItems[currentIndex].src;
      img.alt = mediaItems[currentIndex].alt || '';
      overlay.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      img.focus && img.focus();
    }
    function hideOverlay(){
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
    function showPrev(e){ e && e.stopPropagation(); showOverlay((currentIndex-1+mediaItems.length)%mediaItems.length); }
    function showNext(e){ e && e.stopPropagation(); showOverlay((currentIndex+1)%mediaItems.length); }

    mediaItems.forEach((m,i)=>{
      m.style.cursor = 'zoom-in';
      m.setAttribute('tabindex', '0');
      m.addEventListener('click',()=>showOverlay(i));
      m.addEventListener('keydown',(e)=>{
        if(e.key === 'Enter' || e.key === ' '){
          e.preventDefault();
          showOverlay(i);
        }
      });
    });

    overlay.addEventListener('click',(e)=>{ if(e.target===overlay) hideOverlay(); });
    document.addEventListener('keydown',(e)=>{
      if(overlay.style.display==='flex'){
        if(e.key==='Escape') hideOverlay();
        if(e.key==='ArrowLeft') showPrev();
        if(e.key==='ArrowRight') showNext();
      }
    });
  }

  // Make videos play inline on iOS and ensure controls visible
  const vids = document.querySelectorAll('video');
  vids.forEach(v=>{ v.setAttribute('playsinline',''); v.controls = true; });
});