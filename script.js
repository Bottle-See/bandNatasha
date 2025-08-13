
/* ===============================
   NATASHA EPK – v2 (script.js)
   Accordion: fully visible content, smooth transitions (no snapping)
   ARIA + keyboard
   =============================== */
(function(){
  const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

  qsa('.acc-item').forEach((item, idx) => {
    const btn = item.querySelector('.acc-btn');
    const panel = item.querySelector('.acc-panel');
    const inner = document.createElement('div');
    // move existing children into inner wrapper for reliable height
    while (panel.firstChild) inner.appendChild(panel.firstChild);
    inner.className = 'acc-inner';
    panel.appendChild(inner);

    // ARIA
    const panelId = `acc-panel-${idx}`;
    const btnId = `acc-btn-${idx}`;
    btn.id = btnId;
    panel.id = panelId;
    btn.setAttribute('aria-controls', panelId);
    btn.setAttribute('aria-expanded', 'false');
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', btnId);

    const open = () => {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      // set to fixed height (from 0 -> content), then auto after transition
      panel.style.height = inner.scrollHeight + 'px';
      btn.querySelector('.acc-chevron')?.style.setProperty('transform', 'rotate(90deg)');
      const tidy = (e) => {
        if(e.propertyName === 'height'){
          panel.style.height = 'auto';
          panel.removeEventListener('transitionend', tidy);
        }
      };
      panel.addEventListener('transitionend', tidy);
    };

    const close = () => {
      item.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      // from current auto height -> fixed -> 0 (to animate closing)
      if (panel.style.height === 'auto' || panel.style.height === '') {
        panel.style.height = inner.scrollHeight + 'px';
      }
      // force reflow
      void panel.offsetHeight;
      panel.style.height = '0px';
      btn.querySelector('.acc-chevron')?.style.setProperty('transform', 'rotate(0deg)');
    };

    const toggle = () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) close(); else {
        // optional: close others for exclusive behavior
        // qsa('.acc-item.open').forEach(other => other !== item && other.querySelector('.acc-btn').click());
        panel.style.height = '0px';
        requestAnimationFrame(open);
      }
    };

    btn.addEventListener('click', toggle);
    btn.addEventListener('keydown', (e) => {
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault(); toggle();
      }
    });
  });
})();
