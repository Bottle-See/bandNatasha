
/* ===============================
   NATASHA EPK – Scripts (script.js)
   - Smooth accordion open/close
   - Prevent content clipping
   - ARIA attributes + keyboard support
   =============================== */

(function(){
  const qs = (s, el=document) => el.querySelector(s);
  const qsa = (s, el=document) => Array.from(el.querySelectorAll(s));

  // Accordion
  qsa('.acc-item').forEach((item, idx) => {
    const btn = qs('.acc-btn', item);
    const panel = qs('.acc-panel', item);

    // setup ARIA
    const panelId = `acc-panel-${idx}`;
    const btnId = `acc-btn-${idx}`;
    btn.setAttribute('id', btnId);
    panel.setAttribute('id', panelId);
    btn.setAttribute('aria-controls', panelId);
    btn.setAttribute('aria-expanded', 'false');
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', btnId);

    const close = () => {
      item.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      panel.style.height = panel.scrollHeight + 'px'; // set current height to enable transition
      requestAnimationFrame(() => { panel.style.height = '0px'; });
      btn.querySelector('.acc-chevron')?.style.setProperty('transform', 'rotate(0deg)');
    };

    const open = () => {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      const target = qs('.acc-content', panel);
      // temporarily set height to content, then clear for auto height
      const full = target.offsetHeight + parseFloat(getComputedStyle(target).marginBottom || 0) + 18; // padding bottom approx
      panel.style.height = full + 'px';
      btn.querySelector('.acc-chevron')?.style.setProperty('transform', 'rotate(90deg)');
      panel.addEventListener('transitionend', function tidy(e){
        if(e.propertyName === 'height'){
          panel.style.height = 'auto'; // allow dynamic height after transition
          panel.removeEventListener('transitionend', tidy);
        }
      });
    };

    const toggle = () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      if(expanded){ close(); }
      else { 
        // allow multiple open; if you want exclusive, uncomment below:
        // qsa('.acc-item.open').forEach(openItem => qs('.acc-btn', openItem).click());
        panel.style.height = '0px'; // reset
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
