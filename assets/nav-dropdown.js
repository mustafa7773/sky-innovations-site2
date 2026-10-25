(function () {
  function closeLi(li) {
    li.classList.remove('open');
    var b = li.querySelector(':scope > .sub-toggle');
    if (b) b.setAttribute('aria-expanded', 'false');
  }
  document.querySelectorAll('.has-sub').forEach(function (li) {
    var btn = li.querySelector(':scope > .sub-toggle');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = li.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.has-sub.open').forEach(function (li) {
      if (!li.contains(e.target)) closeLi(li);
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.has-sub.open').forEach(function (li) {
      closeLi(li);
      var b = li.querySelector(':scope > .sub-toggle');
      if (b) b.focus();
    });
  });

  /* إيقاف حركة المدار خارج الشاشة لتخفيف الحمل أثناء التمرير */
  var hero = document.querySelector('.hero');
  if (hero && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      hero.classList.toggle('is-offscreen', !entries[0].isIntersecting);
    }).observe(hero);
  }
})();
