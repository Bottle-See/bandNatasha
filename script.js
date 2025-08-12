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