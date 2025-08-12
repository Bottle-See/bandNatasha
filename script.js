// Reveal(있으면 유지) + Tracks accordion
document.addEventListener('DOMContentLoaded', () => {
  // (선택) 기존 섹션 페이드인
  const reveals = document.querySelectorAll('.section, .card, .timeline li, .member');
  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.transition = 'opacity .6s ease, transform .6s ease';
        e.target.style.opacity = '1';
        e.target.style.transform = 'none';
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  reveals.forEach(el => { el.style.opacity='0'; el.style.transform='translateY(12px)'; io.observe(el); });

  // ===== Tracks accordion =====
  const items = [...document.querySelectorAll('#trkAccordion .trk-item')];
  const closeItem = (it) => {
    if (!it.classList.contains('open')) return;
    const panel = it.querySelector('.trk-panel');
    const hdr = it.querySelector('.trk-hdr');
    hdr.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = panel.scrollHeight + 'px';
    requestAnimationFrame(() => { panel.style.maxHeight = '0px'; });
    it.classList.remove('open');
  };
  const openItem = (it) => {
    if (it.classList.contains('open')) return;
    const panel = it.querySelector('.trk-panel');
    const hdr = it.querySelector('.trk-hdr');
    hdr.setAttribute('aria-expanded', 'true');
    it.classList.add('open');
    panel.style.maxHeight = panel.scrollHeight + 'px';
  };

  items.forEach(it => {
    const panel = it.querySelector('.trk-panel');
    const hdr = it.querySelector('.trk-hdr');
    it.classList.remove('open');
    hdr.setAttribute('aria-expanded', 'false');
    panel.style.maxHeight = '0px';
    hdr.addEventListener('click', () => {
      const wasOpen = it.classList.contains('open');
      items.forEach(o => { if (o !== it) closeItem(o); });
      if (wasOpen) closeItem(it); else openItem(it);
    });
  });

  window.addEventListener('resize', () => {
    const openPanel = document.querySelector('#trkAccordion .trk-item.open .trk-panel');
    if (openPanel) openPanel.style.maxHeight = openPanel.scrollHeight + 'px';
  });
});
