const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#site-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    document.body.classList.toggle('menu-open', !open);
  });
  nav.addEventListener('click', () => {
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  });
}

document.querySelectorAll('a[href]').forEach((link) => {
  const url = new URL(link.href, window.location.href);
  const isExternalWebLink = (url.protocol === 'http:' || url.protocol === 'https:') && url.origin !== window.location.origin;
  if (isExternalWebLink) {
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  }
});

document.querySelectorAll('[data-project-slider]').forEach((slider) => {
  const section = slider.closest('.selected-work');
  const previous = section?.querySelector('.slider-prev');
  const next = section?.querySelector('.slider-next');

  const move = (direction) => {
    const card = slider.querySelector('.slider-card');
    if (!card) return;
    const gap = parseFloat(getComputedStyle(slider).columnGap) || 0;
    slider.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth' });
  };

  previous?.addEventListener('click', () => move(-1));
  next?.addEventListener('click', () => move(1));
  slider.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      move(-1);
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      move(1);
    }
  });
});
