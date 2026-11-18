// Hero scroll. Writes only --p (0 to 1) and data-at (1 to 5) on .hero. All movement is in hero.css.
// No script, or reduced motion: nothing is added and the hero rests on the finished frame.
(function () {
  var hero = document.querySelector('[data-hero]');
  if (!hero) return;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var track = hero.querySelector('.hero__track');
  var stage = hero.querySelector('.hero__stage');
  var header = document.querySelector('.site-header');
  if (!track || !stage) return;
  var controls = Array.from(hero.querySelectorAll('[data-hero-jump]'));
  controls.forEach(function (button, index) {
    button.addEventListener('click', function () {
      if (reduced) {
        hero.querySelectorAll('.hero__frame').forEach(function (frame, i) { frame.style.opacity = i === index ? '1' : '0'; });
        controls.forEach(function (control, i) { control.setAttribute('aria-pressed', String(i === index)); });
        hero.setAttribute('data-at', String(index + 1));
        return;
      }
      var offset = header ? header.getBoundingClientRect().height : 0;
      var run = track.offsetHeight - stage.offsetHeight;
      var target = [0, 1.15 / 3.25, 2.15 / 3.25, 1][index];
      window.scrollTo({top: window.scrollY + track.getBoundingClientRect().top - offset + run * target, behavior: 'smooth'});
    });
  });
  if (reduced) { controls[2].setAttribute('aria-pressed', 'true'); return; }
  hero.classList.add('hero-live');
  var last = -1;
  function update() {
    var offset = header ? header.getBoundingClientRect().height : 0;
    var run = track.offsetHeight - stage.offsetHeight;
    var p = run > 0 ? Math.min(1, Math.max(0, (offset - track.getBoundingClientRect().top) / run)) : 1;
    if (Math.abs(p - last) < 0.0005) return;
    last = p;
    hero.style.setProperty('--p', p.toFixed(4));
    var current = Math.min(4, Math.max(1, Math.floor(p * 3.25 + 0.2) + 1));
    hero.setAttribute('data-at', String(current));
    controls.forEach(function (control, i) { control.setAttribute('aria-pressed', String(i + 1 === current)); });
  }
  var queued = false;
  window.addEventListener('scroll', function () {
    if (queued) return;
    queued = true;
    window.requestAnimationFrame(function () { queued = false; update(); });
  }, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('pageshow', update);
  update();
})();
