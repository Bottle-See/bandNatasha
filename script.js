// JavaScript for Natasha EP "열기" event web app
// Handles the opening and closing of the modal player

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('videoModal');
  const playBtn = document.getElementById('playVideoButton');
  const closeBtn = document.getElementById('modalClose');

  // Show modal when play button is clicked
  playBtn?.addEventListener('click', () => {
    if (modal) {
      modal.style.display = 'flex';
    }
  });

  // Close modal when close icon is clicked
  closeBtn?.addEventListener('click', () => {
    if (modal) {
      modal.style.display = 'none';
    }
  });

  // Close modal when clicking outside of modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});