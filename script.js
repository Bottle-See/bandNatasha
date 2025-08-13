
/* ===============================
   NATASHA EPK — FEVER THEME v2 (script.js)
   =============================== */
(function(){
  const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

  qsa('.acc-item').forEach((item, idx) => {
    const btn = item.querySelector('.acc-btn');
    const panel = item.querySelector('.acc-panel');

    // Wrap existing children into inner for reliable height
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
