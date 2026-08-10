/* =========================================================
   Sky Innovations — طبقة الحركة الموحّدة
   تعمل على كل الصفحات، وتحترم prefers-reduced-motion
   ========================================================= */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (reduce.matches) {
    document.documentElement.classList.add('sn-no-motion');
    return;
  }
  document.documentElement.classList.add('sn-motion');

  /* ---- 1. تسلسل دخول الهيرو عند تحميل الصفحة ---- */
  function enterHero() {
    var hero = document.querySelector('.hero, .page-hero, .page-header');
    if (!hero) return;
    var host = hero.querySelector('.hero-content, .page-header-content, .page-hero-content, .container') || hero;
    var items = host.querySelectorAll(':scope > *');
    var i = 0;
    items.forEach(function (el) {
      if (!el.textContent.trim() && !el.querySelector('a,button,img')) return;
      el.classList.add('sn-enter');
      el.style.transitionDelay = (0.08 + i * 0.09).toFixed(2) + 's';
      i++;
    });
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { host.classList.add('sn-entered'); });
    });
  }

  /* ---- 2. كشف تدريجي عند التمرير مع تتابع داخل كل مجموعة ---- */
  function setupReveal() {
    var groups = document.querySelectorAll(
      '.services-grid, .products-grid, .product-grid, .values-grid, .projects-grid,' +
      '.features-grid, .cards-grid, .sn-paths__grid, .courses-grid, .steps-grid,' +
      '.testimonials-grid, .partners-grid, .certs-grid, .equipment-grid, .overview-grid'
    );
    groups.forEach(function (g) {
      Array.prototype.forEach.call(g.children, function (child, idx) {
        child.classList.add('sn-rise');
        child.style.transitionDelay = Math.min(idx * 0.07, 0.42) + 's';
      });
    });

    var solo = document.querySelectorAll(
      '.section-title, .section-sub, .section-subtitle, .sn-paths__title, .sn-paths__sub,' +
      '.stats-grid, .form-card, .contact-form, .compare-table-wrap, .manifesto, .founder-card'
    );
    solo.forEach(function (el) { el.classList.add('sn-rise'); });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('sn-in');
        io.unobserve(e.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    document.querySelectorAll('.sn-rise').forEach(function (el) { io.observe(el); });

    // شبكة أمان: أي عنصر بقي مخفياً (محتوى يُبنى بعد التحميل) يظهر تلقائياً
    setTimeout(function () {
      document.querySelectorAll('.sn-rise:not(.sn-in)').forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) el.classList.add('sn-in');
      });
    }, 2500);
  }

  /* ---- 3. شريط التنقل: يتكثّف عند النزول ---- */
  function setupNav() {
    var nav = document.querySelector('.sn-nav');
    if (!nav) return;
    var last = -1;
    function onScroll() {
      var y = window.scrollY > 24;
      if (y !== last) { nav.classList.toggle('sn-nav--solid', y); last = y; }
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- 4. انزياح خفيف جداً لخلفية الهيرو (parallax) ---- */
  function setupParallax() {
    var sky = document.querySelector('.hero .sky, .page-hero .sky, .page-header .sky');
    if (!sky) return;
    var ticking = false;
    function update() {
      var y = window.scrollY;
      if (y < 900) sky.style.transform = 'translate3d(0,' + (y * 0.14).toFixed(1) + 'px,0)';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }, { passive: true });
  }

  /* ---- 5. تمرير ناعم للروابط الداخلية ---- */
  function setupAnchors() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href^="#"]');
      if (!a) return;
      var id = a.getAttribute('href');
      if (id.length < 2) return;
      var t = document.querySelector(id);
      if (!t) return;
      e.preventDefault();
      var top = t.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  }

  function init() {
    enterHero();
    setupReveal();
    setupNav();
    setupParallax();
    setupAnchors();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
