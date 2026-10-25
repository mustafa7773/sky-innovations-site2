/* تبديل اللغة + بناء القائمة الرئيسية — ابتكارات السماء */
(function () {
  'use strict';

  /* ===== القائمة: عدّلها من هنا فقط، وتنعكس على كل الصفحات ===== */
  var MENU = [
    ['الرئيسية', 'Home', 'index.html', [
      ['نبذة عن الشركة', 'About the company', 'about.html'],
      ['الرؤية', 'Vision', 'about.html#vision'],
      ['الرسالة', 'Mission', 'about.html#mission'],
      ['أخبار الشركة', 'Company news', 'news.html']
    ]],
    ['الخدمات', 'Services', 'services.html', [
      ['طلب تحديد القبلة للجوامع والمساجد', 'Qibla determination request for mosques', 'qibla.html'],
      ['المسوحات الشبكية', 'Network surveys', 'network-surveys.html'],
      ['تحسين مواقع الشبكية', 'Network site optimization', 'network-site-optimization.html'],
      ['تركيب وإدارة المراصد الفلكية', 'Astronomical observatory installation and management', 'observatory-control.html'],
      ['تركيب وصيانة المحطات الأرضية البصرية', 'Optical ground station installation and maintenance', 'ground-stations.html'],
      ['إدارة المشاريع الفضائية', 'Space project management', 'space-mission-management.html'],
      ['معالجة وتحليل البيانات الضخمة', 'Big data processing and analysis', 'big-data-processing.html'],
      ['تنصيب برامج الأمن السيبراني', 'Cybersecurity software installation', 'cybersecurity.html']
    ]],
    ['تسويق المنتجات', 'Product marketing', 'products.html', [
      ['أنظمة الأقمار الاصطناعية', 'Satellite systems', 'satellite-systems.html'],
      ['أنظمة الطاقة الشمسية', 'Solar energy systems', 'solar-systems.html'],
      ['شواحن السيارات الكهربائية', 'EV chargers', 'ev-chargers.html'],
      ['منصات رقمية للمراقبة اليومية وللكشف عن التغييرات', 'Digital platforms for daily monitoring and change detection', 'monitoring-platforms.html'],
      ['تطبيقات الهواتف النقالة', 'Mobile applications', 'mobile-apps.html'],
      ['أجهزة علمية للمختبرات', 'Scientific equipment for laboratories', 'scientific-equipment.html'],
      ['نماذج ثلاثية الأبعاد', '3D models', '3d-models.html'],
      ['مساعد الإمام الذكي', 'Smart Imam assistant', 'imam-app.html']
    ]],
    ['الابتكارات والتقنية', 'Innovations and technology', 'innovations.html', [
      ['الحلول الابتكارية', 'Innovative solutions', 'innovative-solutions.html'],
      ['مراقبة البيئة المستدامة', 'Sustainable environmental monitoring', 'sustainable-environment.html'],
      ['أنظمة المدن الإدراكية', 'Cognitive city systems', 'cognitive-cities.html'],
      ['البحث والتطوير والنمذجة الأولية', 'R and D and prototyping', 'rd-prototyping.html'],
      ['نظام مراقبة وصيانة الأفلاج', 'Aflaj monitoring and maintenance system', 'aflaj-monitoring.html'],
      ['تطبيقات الحوسبة الكمية', 'Quantum computing applications', 'quantum-computing.html'],
      ['دراسات وتقنيات جديدة', 'New studies and technologies', 'new-studies.html']
    ]],
    ['بناء القدرات', 'Capacity building', 'capacity.html', [
      ['دورات الفلك والفضاء', 'Astronomy and space courses', 'astronomy-courses.html'],
      ['تأهيل الكوادر لتطوير الأقمار المكعبية', 'Training talent to develop CubeSats', 'cubesat-training.html'],
      ['ورش تدريبية لتوظيف الذكاء الاصطناعي', 'AI training workshops', 'ai-workshops.html'],
      ['مختبر الحاسب الآلي لبناء القدرات', 'Computer lab for capacity building', 'computer-lab.html']
    ]],
    ['الشركاء والمشاريع', 'Partners and projects', 'projects.html', [
      ['الشركاء الدوليين', 'International partners', 'international-partners.html'],
      ['الزبائن المحليين', 'Local clients', 'local-clients.html'],
      ['المشاريع السابقة', 'Past projects', 'past-projects.html']
    ]],
    ['تواصل معنا', 'Contact', 'contact.html', []]
  ];

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html) e.innerHTML = html;
    return e;
  }

  function buildMenu() {
    var ul = document.querySelector('.nav-menu');
    if (!ul) return;
    var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    ul.innerHTML = '';
    MENU.forEach(function (m) {
      var li = el('li');
      var a = el('a', { href: m[2], 'data-en': m[1] }, m[0]);
      var isActive = m[2].toLowerCase() === page ||
        m[3].some(function (s) { return s[2].split('#')[0].toLowerCase() === page && s[2].toLowerCase() !== 'about.html' || (m[2] === 'index.html' && page === 'about.html'); });
      if (isActive) a.className = 'active';
      li.appendChild(a);
      if (m[3].length) {
        li.className = 'has-sub';
        li.appendChild(el('button', {
          'class': 'sub-toggle', type: 'button', 'aria-expanded': 'false',
          'aria-label': 'القائمة الفرعية / Submenu'
        }, '<i class="fa-solid fa-chevron-down"></i>'));
        var sub = el('ul', { 'class': 'sub-menu' });
        m[3].forEach(function (s) {
          var sl = el('li');
          sl.appendChild(el('a', { href: s[2], 'data-en': s[1] }, s[0]));
          sub.appendChild(sl);
        });
        li.appendChild(sub);
      }
      ul.appendChild(li);
    });
  }
  buildMenu();

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

    document.title = isEn ? body.dataset.titleEn : body.dataset.titleAr;
    var meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', isEn ? body.dataset.descEn : body.dataset.descAr);

    var label = document.getElementById('langLabel');
    if (label) label.textContent = isEn ? 'ع' : 'EN';

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* التخزين غير متاح */ }
  }

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

  var toggle = document.querySelector('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var menu = document.querySelector('.nav-menu');
      menu.classList.toggle('open');
      this.setAttribute('aria-expanded', menu.classList.contains('open'));
    });
  }
})();
