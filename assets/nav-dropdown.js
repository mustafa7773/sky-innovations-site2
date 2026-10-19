(function () {
  document.querySelectorAll('.has-sub').forEach(function (li) {
    var btn = li.querySelector('.sub-toggle');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.has-sub.open').forEach(function (li) {
      if (!li.contains(e.target)) {
        li.classList.remove('open');
        var b = li.querySelector('.sub-toggle');
        if (b) b.setAttribute('aria-expanded', 'false');
      }
    });
  });
})();