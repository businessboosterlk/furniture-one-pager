// Sections 3 to 8. Rooms: one room at a time. Ready to buy: the 01 / 04 counter on the phone swipe row.
// Build yours: the step bar, the summary line and the WhatsApp message. All movement is in sections.css.
// Without this file every section still reads and every link still works (rooms sit in a grid, build uses plain radios).
(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var pad = function (n) { return (n < 10 ? '0' : '') + n; };

  // A bracketed value is a placeholder: wrap it the same way the page does at build time (no innerHTML).
  function setPh(el, text) {
    el.textContent = '';
    text.split(/(\[[^\]]+\])/).forEach(function (part) {
      if (!part) return;
      if (part.charAt(0) === '[') {
        var s = document.createElement('span');
        s.className = 'ph';
        s.textContent = part;
        el.appendChild(s);
      } else el.appendChild(document.createTextNode(part));
    });
  }

  // ROOMS
  var rooms = $('[data-rooms]');
  if (rooms) {
    var panels = $$('.room', rooms);
    var tabs = $$('[data-room-tab]', rooms);
    var counter = $('[data-rooms-n]', rooms);
    var next = $('[data-rooms-next]', rooms);
    var cur = 0;
    var show = function (i) {
      cur = (i + panels.length) % panels.length;
      panels.forEach(function (p, k) {
        if (k === cur) { p.setAttribute('data-active', ''); p.removeAttribute('inert'); }
        else { p.removeAttribute('data-active'); p.setAttribute('inert', ''); }
      });
      tabs.forEach(function (t, k) {
        if (k === cur) t.setAttribute('aria-current', 'true'); else t.removeAttribute('aria-current');
      });
      if (counter) counter.textContent = pad(cur + 1);
    };
    rooms.classList.add('rooms--live');
    show(0);
    tabs.forEach(function (t, k) { t.addEventListener('click', function () { show(k); }); });
    if (next) next.addEventListener('click', function () { show(cur + 1); });
  }

  // READY TO BUY: which card is at the left of the phone swipe row
  var row = $('[data-ready]');
  var rn = $('[data-ready-n]');
  if (row && rn) {
    var cards = $$('.card', row);
    row.addEventListener('scroll', function () {
      if (cards.length < 2) return;
      var step = cards[1].offsetLeft - cards[0].offsetLeft;
      if (step <= 0) return;
      var i = Math.max(0, Math.min(cards.length - 1, Math.round(row.scrollLeft / step)));
      rn.textContent = pad(i + 1);
    }, { passive: true });
  }

  // BUILD YOURS
  var build = $('[data-build]');
  if (build) {
    var names = ['preset', 'size', 'fabric'];
    var groups = {};
    names.forEach(function (n) { groups[n] = $$('input[name="' + n + '"]', build); });
    var steps = $$('.steps li', build);
    var sum = $('[data-sum]', build);
    var send = $('[data-send]', build);
    var price = $('[data-price]', build);
    var base = build.getAttribute('data-wa');
    var intro = build.getAttribute('data-intro');
    var done = [false, false, false, false];
    var label = function (n) {
      var c = groups[n].filter(function (i) { return i.checked; })[0];
      return c ? c.getAttribute('data-label') : '';
    };
    var paint = function () {
      var now = done.indexOf(false);
      steps.forEach(function (li, k) {
        li.removeAttribute('data-state');
        if (done[k]) li.setAttribute('data-state', 'done');
        else if (k === now) li.setAttribute('data-state', 'now');
      });
    };
    var refresh = function () {
      var p = label('preset'), z = label('size'), f = label('fabric');
      if (sum) setPh(sum, p + ' · ' + z + ' · ' + f);
      if (send) send.setAttribute('href', base + '?text=' + encodeURIComponent(intro + ' Start: ' + p + '. Size: ' + z + '. Fabric: ' + f + '.'));
      if (price) { price.removeAttribute('data-tick'); void price.offsetWidth; price.setAttribute('data-tick', ''); }
      paint();
    };
    names.forEach(function (n, k) {
      groups[n].forEach(function (input) {
        input.addEventListener('change', function () { done[k] = true; refresh(); });
      });
    });
    if (send) send.addEventListener('click', function () { done[3] = true; paint(); });
    paint();
  }
})();
