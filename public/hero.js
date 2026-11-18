// Optional making chapters: no scroll lock, timer, or forced carousel.
(function () {
  var hero = document.querySelector('[data-hero]');
  if (!hero) return;
  var buttons = Array.from(hero.querySelectorAll('[data-hero-jump]'));
  var frames = Array.from(hero.querySelectorAll('.hero__frame'));
  var caption = hero.querySelector('[data-hero-caption]');
  function select(index) {
    buttons.forEach(function (button, i) { button.setAttribute('aria-pressed', String(i === index)); });
    frames.forEach(function (frame, i) {
      frame.setAttribute('data-active', String(i === index));
      frame.setAttribute('aria-hidden', String(i !== index));
    });
    if (caption) caption.textContent = buttons[index].getAttribute('data-caption');
  }
  buttons.forEach(function (button, index) {
    button.addEventListener('click', function () { select(index); });
    button.addEventListener('keydown', function (event) {
      var next = event.key === 'ArrowRight' ? (index + 1) % buttons.length : event.key === 'ArrowLeft' ? (index + buttons.length - 1) % buttons.length : -1;
      if (next < 0) return;
      event.preventDefault(); buttons[next].focus(); select(next);
    });
  });
  select(3);
})();
