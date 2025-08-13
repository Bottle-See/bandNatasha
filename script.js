// ===== 공통 스크립트 =====
document.addEventListener('DOMContentLoaded', () => {
  /* Smooth anchor jump 보정이 필요하면 사용 (sticky header 높이 조절용)
  if (location.hash) {
    const t = document.querySelector(location.hash);
    if (t) {
      const y = t.getBoundingClientRect().top + window.scrollY - 76;
      window.scrollTo({ top: y });
    }
  }
  */

  // ===== Tracks Accordion (tracks.html에서만 동작) =====
  const acc = document.getElementById('trkAccordion');
  if (!acc) return;

  const items = [...acc.querySelectorAll('.trk-item')];

  const openItem = (it) => {
    if (it.classList.contains('open')) return;
    const p = it.querySelector('.trk-panel');
    it.classList.add('open');
    p.style.maxHeight = p.scrollHeight + 'px';
    it.querySelector('.trk-hdr').setAttribute('aria-expanded', 'true');
  };

  const closeItem = (it) => {
    if (!it.classList.contains('open')) return;
    const p = it.querySelector('.trk-panel');
    // 현재 높이에서 0으로 애니메이션
    p.style.maxHeight = p.scrollHeight + 'px';
    requestAnimationFrame(() => { p.style.maxHeight = '0px'; });
    it.classList.remove('open');
    it.querySelector('.trk-hdr').setAttribute('aria-expanded', 'false');
  };

  items.forEach((it) => {
    const btn = it.querySelector('.trk-hdr');
    const p   = it.querySelector('.trk-panel');
    p.style.maxHeight = '0px';
    btn.setAttribute('aria-expanded', 'false');

    btn.addEventListener('click', () => {
      const wasOpen = it.classList.contains('open');
      items.forEach(closeItem);  // 하나만 열리게
      if (!wasOpen) openItem(it);
    });
  });

  // 리사이즈 시 열린 패널 높이 재계산
  window.addEventListener('resize', () => {
    const openPanel = acc.querySelector('.trk-item.open .trk-panel');
    if (openPanel) openPanel.style.maxHeight = openPanel.scrollHeight + 'px';
  });
});
