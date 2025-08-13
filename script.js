
/* ===============================
   NATASHA EPK — FEVER THEME v4 (script.js)
   - Accordion: one-open-only behavior
   - Smooth height transitions, no clipping
   =============================== */
(function(){
  const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

  qsa('.acc-item').forEach((item, idx) => {
    const btn = item.querySelector('.acc-btn');
    const panel = item.querySelector('.acc-panel');

    // Wrap children
    let inner = panel.querySelector('.acc-inner');
    if(!inner){
      inner = document.createElement('div');
      inner.className = 'acc-inner';
      while (panel.firstChild) inner.appendChild(panel.firstChild);
      panel.appendChild(inner);
    }

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
      // close others (one-open-only)
      qsa('.acc-item.open').forEach(other => {
        if (other !== item) {
          const otherBtn = other.querySelector('.acc-btn');
          const otherPanel = other.querySelector('.acc-panel');
          const otherInner = otherPanel.querySelector('.acc-inner');
          other.classList.remove('open');
          otherBtn.setAttribute('aria-expanded','false');
          if (getComputedStyle(otherPanel).height === 'auto' || otherPanel.style.height === '') {
            otherPanel.style.height = otherInner.scrollHeight + 'px';
          }
          void otherPanel.offsetHeight; // reflow
          otherPanel.style.height = '0px';
          const c = otherBtn.querySelector('.acc-chevron'); if (c) c.style.transform = 'rotate(0deg)';
        }
      });

      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      panel.style.height = inner.scrollHeight + 'px';
      const tidy = (e) => {
        if(e.propertyName === 'height'){
          panel.style.height = 'auto';
          panel.removeEventListener('transitionend', tidy);
        }
      };
      panel.addEventListener('transitionend', tidy);
      const chevron = btn.querySelector('.acc-chevron');
      if (chevron) chevron.style.transform = 'rotate(90deg)';
    };

    const close = () => {
      item.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      if (panel.style.height === 'auto' || panel.style.height === '') {
        panel.style.height = inner.scrollHeight + 'px';
      }
      void panel.offsetHeight;
      panel.style.height = '0px';
      const chevron = btn.querySelector('.acc-chevron');
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    };

    const toggle = () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if (expanded) close(); else {
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
