/* تبديل اللغة بين العربية والإنجليزية — ابتكارات السماء */
(function () {
  'use strict';

  var STORE_KEY = 'si-lang';
  var root = document.documentElement;
  var body = document.body;

  /* حفظ النص العربي الأصلي مرة واحدة قبل أي تبديل */
  var nodes = document.querySelectorAll('[data-en]');
  nodes.forEach(function (el) {
    el.dataset.ar = el.innerHTML;
  });

  function setLang(lang) {
    var isEn = lang === 'en';

    root.setAttribute('lang', isEn ? 'en' : 'ar');
    root.setAttribute('dir', isEn ? 'ltr' : 'rtl');

    nodes.forEach(function (el) {
      el.innerHTML = isEn ? el.dataset.en : el.dataset.ar;
    });

    /* عنوان الصفحة ووصفها */
    document.title = isEn ? body.dataset.titleEn : body.dataset.titleAr;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', isEn ? body.dataset.descEn : body.dataset.descAr);

    /* نص الزر: يعرض اللغة التي سينتقل إليها */
    var label = document.getElementById('langLabel');
    if (label) label.textContent = isEn ? 'ع' : 'EN';

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* التخزين غير متاح */ }
  }

  /* اللغة المحفوظة، أو الإنجليزية لمن لغة متصفحه ليست العربية */
  var saved = null;
  try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* تجاهل */ }
  if (!saved) {
    saved = (navigator.language || 'ar').toLowerCase().indexOf('ar') === 0 ? 'ar' : 'en';
  }
  setLang(saved);

  var btn = document.getElementById('langBtn');
  if (btn) {
    btn.addEventListener('click', function () {
      setLang(root.getAttribute('lang') === 'ar' ? 'en' : 'ar');
    });
  }

  /* قائمة الجوال */
  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var menu = document.querySelector('.nav-menu');
      menu.classList.toggle('open');
      this.setAttribute('aria-expanded', menu.classList.contains('open'));
    });
  }
})();
