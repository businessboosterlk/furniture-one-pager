// Phone menu. Opens and closes the drawer, closes on Escape, on a link press and on a press outside.
// The stylesheet owns all movement; this only flips data-open and aria-expanded.
(function () {
  var header = document.querySelector('.site-header');
  var btn = document.querySelector('[data-menu-toggle]');
  if (!header || !btn) return;
  function set(open) {
    if (open) header.setAttribute('data-open', '');
    else header.removeAttribute('data-open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  btn.addEventListener('click', function () {
    set(!header.hasAttribute('data-open'));
  });
  header.addEventListener('click', function (e) {
    if (e.target instanceof Element && e.target.closest('.site-nav__link')) set(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.hasAttribute('data-open')) {
      set(false);
      btn.focus();
    }
  });
  document.addEventListener('click', function (e) {
    if (header.hasAttribute('data-open') && e.target instanceof Node && !header.contains(e.target)) set(false);
  });
})();
