/* Sky Innovations — سلوك شريط التنقل الموحّد */
(function () {
  var nav = document.querySelector('.sn-nav');
  if (!nav) return;
  var menu = nav.querySelector('.sn-menu');
  var toggle = nav.querySelector('.sn-toggle');
  var subs = Array.prototype.slice.call(nav.querySelectorAll('[data-sub-toggle]'));
  var isDesktop = function () { return window.innerWidth > 1100; };

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var open = menu.getAttribute('data-open') === 'true';
      menu.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });
  }

  function closeAll(except) {
    subs.forEach(function (b) {
      if (b === except) return;
      b.setAttribute('aria-expanded', 'false');
      var p = document.getElementById(b.getAttribute('aria-controls'));
      if (p) p.setAttribute('data-open', 'false');
    });
  }

  subs.forEach(function (btn) {
    var panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!panel) return;
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') === 'true';
      closeAll(btn);
      btn.setAttribute('aria-expanded', String(!open));
      panel.setAttribute('data-open', String(!open));
    });
    var li = btn.parentElement;
    li.addEventListener('mouseenter', function () {
      if (!isDesktop()) return;
      closeAll(btn);
      btn.setAttribute('aria-expanded', 'true');
      panel.setAttribute('data-open', 'true');
    });
    li.addEventListener('mouseleave', function () {
      if (!isDesktop()) return;
      btn.setAttribute('aria-expanded', 'false');
      panel.setAttribute('data-open', 'false');
    });
  });

  document.addEventListener('click', function (e) { if (!nav.contains(e.target)) closeAll(null); });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeAll(null);
    if (menu) menu.setAttribute('data-open', 'false');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });

  // تعليم الصفحة الحالية
  var here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  nav.querySelectorAll('a[href]').forEach(function (a) {
    var h = (a.getAttribute('href') || '').split('#')[0].toLowerCase();
    if (h === here) a.setAttribute('aria-current', 'page');
  });
})();

/* ترجمة التذييل الموحّد تلقائياً عند تغيير اتجاه الصفحة */
(function () {
  var f = document;
  function apply(lang) {
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (!el.dataset.ar) el.dataset.ar = el.textContent.trim();
      el.textContent = lang === 'en' ? el.dataset.en : el.dataset.ar;
    });
  }
  var cur = '';
  function check() {
    var lang = (document.body.dir === 'ltr' || document.documentElement.dir === 'ltr') ? 'en' : 'ar';
    if (lang !== cur) { cur = lang; apply(lang); }
  }
  check();
  new MutationObserver(check).observe(document.documentElement, { attributes: true, attributeFilter: ['dir', 'lang'] });
  new MutationObserver(check).observe(document.body, { attributes: true, attributeFilter: ['dir', 'class'] });
})();
