// NATASHA site scripts
document.addEventListener('DOMContentLoaded', () => {
  /* =========================
     Section reveal (optional)
  ========================== */
  const reveals = document.querySelectorAll('.section, .card, .timeline li, .member');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transition = 'opacity .6s ease, transform .6s ease';
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    io.observe(el);
  });

  /* =========================
     Tracks accordion (button)
     - Only one open at a time
     - Smooth height animation
  ========================== */
  const items = Array.from(document.querySelectorAll('#trkAccordion .trk-item'));

  const closeItem = (it) => {
    if (!it.classList.contains('open')) return;
    const panel = it.querySelector('.trk-panel');
    const btn = it.querySelector('.trk-hdr');
    btn.setAttribute('aria-expanded', 'false');
    // animate from current height to 0
    panel.style.maxHeight = panel.scrollHeight + 'px';
    requestAnimationFrame(() => { panel.style.maxHeight = '0px'; });
    it.classList.remove('open');
  };

  const openItem = (it) => {
    if (it.classList.contains('open')) return;
    const panel = it.querySelector('.trk-panel');
    const btn = it.querySelector('.trk-hdr');
    btn.setAttribute('aria-expanded', 'true');
    it.classList.add('open');
    // set height to content for smooth slide
    panel.style.maxHeight = panel.scrollHeight + 'px';
  };

  items.forEach(it => {
    const btn = it.querySelector('.trk-hdr');
    const panel = it.querySelector('.trk-panel');
    // start closed
    it.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = '0px';

    btn.addEventListener('click', () => {
      const wasOpen = it.classList.contains('open');
      // close others
      items.forEach(o => { if (o !== it) closeItem(o); });
      // toggle current
      if (wasOpen) closeItem(it);
      else openItem(it);
    });
  });

  // keep open panel height correct on resize
  window.addEventListener('resize', () => {
    const openPanel = document.querySelector('#trkAccordion .trk-item.open .trk-panel');
    if (openPanel) openPanel.style.maxHeight = openPanel.scrollHeight + 'px';
  });

  /* =========================
     Anchor jump fix (offset)
     - If page opens with #hash,
       scroll again to account for sticky header
  ========================== */
  const adjustForHeader = () => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        const y = target.getBoundingClientRect().top + window.scrollY - 76; // header height
        window.scrollTo({ top: y, behavior: 'instant' in window ? 'instant' : 'auto' });
      }
    }
  };
  // run after initial styles apply
  setTimeout(adjustForHeader, 0);
});
