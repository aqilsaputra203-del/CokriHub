// Mobile navigation menu toggle
const menu = document.querySelector('.menu-toggle');
const links = document.querySelector('.nav-links');

if (menu && links) {
  menu.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    menu.classList.toggle('open', isOpen);
    menu.setAttribute('aria-expanded', String(isOpen));
  });

  // Close when clicking any nav link
  links.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      menu.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !links.contains(e.target) && links.classList.contains('open')) {
      links.classList.remove('open');
      menu.classList.remove('open');
      menu.setAttribute('aria-expanded', 'false');
    }
  });
}


// Scroll Motion In and Out (Intersection Observer)
const motionElements = document.querySelectorAll('.reveal-on-scroll, .reveal-scale');

if ('IntersectionObserver' in window) {
  const motionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Motion IN
          entry.target.classList.add('is-visible');
        } else {
          // Motion OUT when scrolling away
          entry.target.classList.remove('is-visible');
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  motionElements.forEach((el) => motionObserver.observe(el));
} else {
  // Fallback for environments without IntersectionObserver
  motionElements.forEach((el) => el.classList.add('is-visible'));
}
