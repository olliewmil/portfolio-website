document.addEventListener('DOMContentLoaded',function(){
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
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click',hideOverlay);

    const navWrap = document.createElement('div');
    navWrap.className = 'lb-nav';
    const prevBtn = document.createElement('button');
    prevBtn.innerHTML = '‹';
    const nextBtn = document.createElement('button');
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
      m.addEventListener('click',()=>showOverlay(i));
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