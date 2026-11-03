// Each project gallery keeps its own current photo, starting with its cover.
document.querySelectorAll('.project-gallery').forEach((gallery) => {
  const slides = Array.from(gallery.querySelectorAll('figure'));
  if (slides.length < 2) return;

  const title = gallery.closest('article').querySelector('h3').textContent;
  gallery.setAttribute('role', 'region');
  gallery.setAttribute('aria-roledescription', 'carousel');
  gallery.setAttribute('aria-label', `${title} photos`);
  gallery.classList.add('is-carousel');

  const controls = document.createElement('div');
  controls.className = 'gallery-controls';
  const previous = document.createElement('button');
  previous.type = 'button';
  previous.textContent = '←';
  previous.setAttribute('aria-label', 'Previous photo');
  const count = document.createElement('span');
  count.className = 'gallery-count';
  count.setAttribute('aria-live', 'polite');
  count.setAttribute('aria-atomic', 'true');
  const next = document.createElement('button');
  next.type = 'button';
  next.textContent = '→';
  next.setAttribute('aria-label', 'Next photo');
  controls.append(previous, count, next);
  gallery.append(controls);

  let current = 0;
  function show(index) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== current; });
    count.textContent = `${current + 1} / ${slides.length}`;
  }
  previous.addEventListener('click', () => show(current - 1));
  next.addEventListener('click', () => show(current + 1));
  gallery.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  show(0);
});
