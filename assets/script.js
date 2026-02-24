(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var nav = document.querySelector('.nav');
  var toggle = document.querySelector('.nav-toggle');

  function onScroll() {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  function toggleMenu() {
    var open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !open);
    nav.classList.toggle('is-open');
    document.body.style.overflow = open ? '' : 'hidden';
  }

  function closeMenu() {
    toggle.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (toggle && nav) {
    toggle.addEventListener('click', toggleMenu);
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Contact form: prevent default and show feedback (no backend)
  var form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var text = btn.textContent;
      btn.textContent = 'Message sent';
      btn.disabled = true;
      setTimeout(function () {
        btn.textContent = text;
        btn.disabled = false;
        form.reset();
      }, 2000);
    });
  }
})();
