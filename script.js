document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.section, .card, .timeline li, .member');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.style.transition = 'opacity .6s ease, transform .6s ease';
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});

  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    io.observe(el);
  });
});
// Tracks: only one open at a time
document.addEventListener('DOMContentLoaded', () => {
  const groups = document.querySelectorAll('#tracklist .track');
  groups.forEach(d => {
    d.addEventListener('toggle', () => {
      if (d.open) {
        groups.forEach(o => { if (o !== d) o.open = false; });
      }
    });
  });
});
// Accordion slide open/close (only one open)
document.addEventListener('DOMContentLoaded', () => {
  const items = [...document.querySelectorAll('#tracksAccordion .acc-item')];

  const closeItem = (it) => {
    if (!it.classList.contains('open')) return;
    const panel = it.querySelector('.acc-panel');
    const header = it.querySelector('.acc-header');
    header.setAttribute('aria-expanded', 'false');
    // animate to 0
    panel.style.maxHeight = panel.scrollHeight + 'px'; // set current height first
    requestAnimationFrame(() => {
      panel.style.maxHeight = '0px';
    });
    it.classList.remove('open');
  };

  const openItem = (it) => {
    if (it.classList.contains('open')) return;
    const panel = it.querySelector('.acc-panel');
    const header = it.querySelector('.acc-header');
    header.setAttribute('aria-expanded', 'true');
    it.classList.add('open');
    // set to content height for smooth slide
    panel.style.maxHeight = panel.scrollHeight + 'px';
  };

  items.forEach(it => {
    const header = it.querySelector('.acc-header');
    const panel = it.querySelector('.acc-panel');

    // ensure start closed
    it.classList.remove('open');
    header.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = '0px';

    header.addEventListener('click', () => {
      const isOpen = it.classList.contains('open');
      // close others
      items.forEach(o => { if (o !== it) closeItem(o); });
      // toggle current
      if (isOpen) closeItem(it);
      else openItem(it);
    });
  });

  // Recompute height on resize for the open one
  window.addEventListener('resize', () => {
    const current = document.querySelector('#tracksAccordion .acc-item.open .acc-panel');
    if (current) current.style.maxHeight = current.scrollHeight + 'px';
  });
});
