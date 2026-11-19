(function () {
  document.querySelectorAll('[data-finish-card]').forEach(function (card) {
    card.addEventListener('change', function () {
      var selected = card.querySelector('input:checked');
      if (!selected) return;
      var preview = card.querySelector('[data-tone]');
      preview.dataset.tone = selected.value;
      preview.setAttribute('aria-label', 'Illustrative ' + card.dataset.name + ', ' + selected.dataset.label);
      card.querySelector('.finish-card__selection').textContent = selected.dataset.label;
      card.querySelector('[data-finish-enquiry]').dataset.enquiry = 'Please tell me about ' + card.dataset.name.toLowerCase() + ' in ' + selected.dataset.label + '. Please confirm available sizes, materials and pricing.';
    });
  });
})();
