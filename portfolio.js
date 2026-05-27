/* portfolio.js — minimal, no canvas, no observers */
document.getElementById('footer-year').textContent = new Date().getFullYear();

document.querySelectorAll('nav ul a').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 56, behavior: 'smooth' });
  });
});