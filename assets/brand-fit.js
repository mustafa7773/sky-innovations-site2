(function () {
  var groups = [
    { box: '.logo > div',         top: 'h1',     bottom: 'p'  },
    { box: '.footer-brand > div', top: 'strong', bottom: 'em' }
  ];
  var arabic = /[\u0600-\u06FF]/;
  var busy = false;

  // نص الشعار ثابت بالعربي والإنجليزي، ولا يغيّره lang.js
  var fixed = [
    { sel: '.logo h1, .footer-brand strong, .hero-brand .brand-ar', text: 'ابتكارات السماء' },
    { sel: '.logo p, .footer-brand em, .hero-brand .brand-en',      text: 'SKY INNOVATIONS' }
  ];
  function lockText() {
    fixed.forEach(function (f) {
      document.querySelectorAll(f.sel).forEach(function (el) {
        if (el.textContent.trim() !== f.text) el.textContent = f.text;
        el.removeAttribute('data-en');
        el.removeAttribute('hidden');
        el.removeAttribute('aria-hidden');
        el.classList.remove('hidden', 'd-none', 'hide');
      });
    });
  }
  var retries = 0;

  function setSize(el, px) {
    el.style.setProperty('font-size', px + 'px', 'important');
  }
  function reset(top, bottom) {
    top.style.removeProperty('font-size');
    bottom.style.removeProperty('font-size');
  }

  function fit() {
    if (busy) return;
    busy = true;
    lockText();
    var failed = false;

    groups.forEach(function (g) {
      document.querySelectorAll(g.box).forEach(function (box) {
        var top = box.querySelector(g.top);
        var bottom = box.querySelector(g.bottom);
        if (!top || !bottom) return;

        top.classList.toggle('is-latin', !arabic.test(top.textContent));
        reset(top, bottom);

        var target = bottom.getBoundingClientRect().width;
        var base = parseFloat(getComputedStyle(top).fontSize);

        // إذا لم تكن العناصر جاهزة للقياس نترك التنسيق الافتراضي ونعيد المحاولة
        if (!(target > 0) || !(base > 0)) { failed = true; return; }

        var size = base;
        for (var i = 0; i < 3; i++) {
          setSize(top, size);
          var w = top.getBoundingClientRect().width;
          if (!(w > 0)) { reset(top, bottom); failed = true; return; }
          size = size * target / w;
        }
        // حماية: لا نسمح بحجم غير منطقي
        if (!isFinite(size) || size < base * 0.5 || size > base * 2) {
          reset(top, bottom);
          return;
        }
        setSize(top, size);
      });
    });

    busy = false;
    if (failed && retries < 10) {
      retries++;
      setTimeout(fit, 150);
    } else if (!failed) {
      retries = 0;
    }
  }

  function init() {
    lockText();
    fit();
    var mo = new MutationObserver(function () { setTimeout(fit, 30); });
    groups.forEach(function (g) {
      document.querySelectorAll(g.box + ' ' + g.top).forEach(function (el) {
        mo.observe(el, { childList: true, characterData: true, subtree: true });
      });
    });
    document.querySelectorAll('.hero-brand span, .logo p, .footer-brand em').forEach(function (el) {
      mo.observe(el, { childList: true, characterData: true, subtree: true });
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] });
    var btn = document.getElementById('langBtn');
    if (btn) btn.addEventListener('click', function () { setTimeout(fit, 80); });
  }

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(init);
  } else {
    window.addEventListener('load', init);
  }
  var rt;window.addEventListener('resize', function(){ clearTimeout(rt); rt=setTimeout(fit,150); });
})();