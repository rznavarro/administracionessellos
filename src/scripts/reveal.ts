// Aparición suave de los elementos .rv al entrar en pantalla.
// `data-delay` (en segundos) escalona elementos hermanos.

const items = document.querySelectorAll<HTMLElement>('.rv');

items.forEach(el => {
  if (el.dataset.delay) el.style.setProperty('--rv-delay', `${el.dataset.delay}s`);
});

if (!('IntersectionObserver' in window)) {
  items.forEach(el => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  );
  items.forEach(el => observer.observe(el));
}
