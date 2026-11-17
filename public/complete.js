(function () {
  'use strict';
  var $ = function (s) { return document.querySelector(s); };
  var build = $('[data-build]');
  var preview = $('[data-preview]');
  var status = $('[data-build-status]');
  var names = ['preset', 'size', 'fabric'];
  var storageKey = 'daru-design-v1';
  var valid = function (v) { return /^[123]$/.test(String(v)); };
  function selected(n) { return $('input[name="' + n + '"]:checked'); }
  function values() { return names.map(function (n) { return selected(n).value; }); }
  function updatePreview() {
    var v = values();
    preview.dataset.preset = v[0]; preview.dataset.row = v[1]; preview.dataset.col = v[2];
    preview.setAttribute('aria-label', 'Illustrative preview: ' + names.map(function (n) { return selected(n).dataset.label; }).join(', '));
    $('[data-dimension="Width"]').textContent = ['1600', '1900', '2300'][Number(v[1]) - 1];
    try { window.localStorage.setItem(storageKey, JSON.stringify(v)); }
    catch { status.textContent = 'Device storage is unavailable. Use Copy design link to keep your choices.'; }
  }
  function choose(v) {
    names.forEach(function (n, i) {
      var input = $('input[name="' + n + '"][value="' + v[i] + '"]');
      input.checked = true;
      input.dispatchEvent(new window.Event('change', {bubbles: true}));
    });
  }
  async function copy(text, output) {
    try { await window.navigator.clipboard.writeText(text); output.textContent = 'Copied. Ready to paste.'; }
    catch { output.textContent = 'Clipboard access is unavailable. Copy the text below:'; var field = document.createElement('textarea'); field.readOnly = true; field.value = text; output.appendChild(field); field.focus(); field.select(); }
  }
  if (build && preview) {
    build.addEventListener('change', updatePreview);
    var initial = ['1', '1', '1'];
    var query = new window.URLSearchParams(window.location.search);
    try { var saved = JSON.parse(window.localStorage.getItem(storageKey) || 'null'); if (Array.isArray(saved) && saved.length === 3 && saved.every(valid)) initial = saved; } catch { /* Defaults remain usable. */ }
    var shared = ['style', 'size', 'fabric'].map(function (key) { return query.get(key); });
    if (shared.every(valid)) initial = shared;
    choose(initial);
    $('[data-share-build]').addEventListener('click', function () {
      var url = new URL(window.location.href); var v = values();
      ['style', 'size', 'fabric'].forEach(function (key, i) { url.searchParams.set(key, v[i]); });
      url.hash = 'build'; copy(url.href, status);
    });
    $('[data-reset-build]').addEventListener('click', function () {
      choose(['1', '1', '1']);
      var url = new URL(window.location.href);
      ['style', 'size', 'fabric'].forEach(function (key) { url.searchParams.delete(key); });
      window.history.replaceState(null, '', url.href);
      status.textContent = 'Reset to round arms, two seats and natural linen.';
    });
  }
  var form = $('[data-enquiry-form]');
  var output = $('[data-enquiry-status]');
  if (form) {
    form.addEventListener('submit', function (event) { event.preventDefault(); });
    document.querySelectorAll('[data-enquiry]').forEach(function (link) {
      link.addEventListener('click', function (event) {
        event.preventDefault(); $('[data-request]').value = link.dataset.enquiry;
        $('#enquiry').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'});
        $('[data-request]').focus({preventScroll: true});
        output.textContent = 'Your selection is added. Add your details, then save or send your enquiry.';
      });
    });
    function brief() {
      if (!form.reportValidity()) return null;
      var fields = new window.FormData(form);
      return 'FURNITURE ENQUIRY\n\n' + String(fields.get('request')).trim() + '\n\nName: ' + (String(fields.get('customer')).trim() || 'Not provided') + '\nContact: ' + (String(fields.get('phone')).trim() || 'Not provided') + '\nRequirements: ' + (String(fields.get('notes')).trim() || 'None added') + '\n\nPlease confirm final price, dimensions, availability and delivery before an order is placed. This is an enquiry, not an order.';
    }
    $('[data-copy-enquiry]').addEventListener('click', function () { var text = brief(); if (text) copy(text, output); });
    $('[data-download-enquiry]').addEventListener('click', function () {
      var text = brief(); if (!text) return;
      var url = URL.createObjectURL(new window.Blob([text], {type: 'text/plain;charset=utf-8'}));
      var a = document.createElement('a'); a.href = url; a.download = 'furniture-enquiry.txt'; document.body.appendChild(a); a.click(); a.remove();
      window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
      output.textContent = 'Your brief has been downloaded. Nothing has been sent to the business.';
    });
    var waButton = $('[data-whatsapp-enquiry]');
    if (waButton) waButton.addEventListener('click', function () {
      var text = brief(); var phone = $('#enquiry').dataset.contactNumber;
      if (text && /^\d{8,15}$/.test(phone)) window.open('https://wa.me/' + phone + '?text=' + encodeURIComponent(text), '_blank', 'noopener,noreferrer');
    });
  }
  var dialog = $('[data-product-dialog]');
  if (dialog) {
    document.querySelectorAll('[data-zoom]').forEach(function (button) {
      button.addEventListener('click', function () {
        var image = button.querySelector('img'); var target = $('[data-dialog-image]');
        target.src = image.currentSrc || image.src; target.alt = image.alt;
        dialog.showModal();
      });
    });
    $('[data-close-dialog]').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (event) { if (event.target === dialog) { var rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  }
})();
