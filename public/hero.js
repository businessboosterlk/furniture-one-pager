// Hero scroll. Writes only --p (0 to 1) and data-at (1 to 5) on .hero. All movement is in hero.css.
// No script, or reduced motion: nothing is added and the hero rests on the finished frame.
(function () {
  var hero = document.querySelector('[data-hero]');
  if (!hero) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var track = hero.querySelector('.hero__track');
  var stage = hero.querySelector('.hero__stage');
  var header = document.querySelector('.site-header');
  if (!track || !stage) return;
  hero.classList.add('hero-live');
  var last = -1;
  function update() {
    var offset = header ? header.getBoundingClientRect().height : 0;
    var run = track.offsetHeight - stage.offsetHeight;
    var p = run > 0 ? Math.min(1, Math.max(0, (offset - track.getBoundingClientRect().top) / run)) : 1;
    if (Math.abs(p - last) < 0.0005) return;
    last = p;
    hero.style.setProperty('--p', p.toFixed(4));
    hero.setAttribute('data-at', String(Math.min(5, Math.max(1, Math.round(p * 4.5) + 1))));
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('pageshow', update);
  update();
})();
