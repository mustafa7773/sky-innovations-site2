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
    ['التطوير وبناء القدرات', 'Development and capacity building', 'capacity.html', [
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

  /* تنسيق الشريط العلوي (ملف مستقل، لا يمس style.css) */
  if (!document.querySelector('link[href*="navbar-fix.css"]')) {
    var css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'assets/navbar-fix.css';
    document.head.appendChild(css);
  }

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html) e.innerHTML = html;
    return e;
  }

  function currentPage() {
    return (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  }

  function markActive(ul) {
    var page = currentPage();
    Array.prototype.forEach.call(ul.children, function (li) {
      var a = li.querySelector(':scope > a');
      if (!a) return;
      var hit = [a].concat(Array.prototype.slice.call(li.querySelectorAll('.sub-menu a'))).some(function (x) {
        return (x.getAttribute('href') || '').split('#')[0].toLowerCase() === page;
      });
      a.classList.toggle('active', hit);
    });
  }

  /* القائمة تُولَّد ثابتة داخل كل صفحة بواسطة scripts/fix_site.py؛
     هذا البناء احتياطي فقط للصفحات التي لم تُعالج بعد */
  function buildMenu() {
    var ul = document.querySelector('.nav-menu');
    if (!ul) return;
    if (ul.getAttribute('data-nav') !== 'static') {
      ul.innerHTML = '';
      MENU.forEach(function (m) {
        var li = el('li');
        li.appendChild(el('a', { href: m[2], 'data-en': m[1] }, m[0]));
        if (m[3].length) {
          li.className = 'has-sub';
          li.appendChild(el('button', {
            'class': 'sub-toggle', type: 'button', 'aria-expanded': 'false',
            'aria-label': 'القائمة الفرعية / Submenu'
          }, '<i class="fa-solid fa-chevron-down" aria-hidden="true"></i>'));
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
    markActive(ul);
  }
  buildMenu();

  var STORE_KEY = 'si-lang';
  var root = document.documentElement;
  var body = document.body;

  /* ===== ترجمة آمنة =====
     - لا نستبدل أبداً محتوى عنصر يحتوي رابطاً أو زراً: نترجم نص الرابط نفسه فقط.
     - النص الإنجليزي يُنقَّى: يُسمح فقط بـ span/br/strong/em/b/i بلا سمات. */
  var ALLOWED = { SPAN: 1, BR: 1, STRONG: 1, EM: 1, B: 1, I: 1 };
  function clean(str) {
    var t = document.createElement('template');
    t.innerHTML = str;
    (function walk(n) {
      Array.prototype.slice.call(n.childNodes).forEach(function (c) {
        if (c.nodeType === 1) {
          if (!ALLOWED[c.tagName]) {
            c.parentNode.replaceChild(document.createTextNode(c.textContent), c);
          } else {
            while (c.attributes.length) c.removeAttribute(c.attributes[0].name);
            walk(c);
          }
        } else if (c.nodeType !== 3) {
          c.parentNode.removeChild(c);
        }
      });
    })(t.content);
    return t.innerHTML;
  }

  var items = [];
  document.querySelectorAll('[data-en]').forEach(function (host) {
    var target = host;
    if (host.tagName !== 'A' && host.tagName !== 'BUTTON') {
      var inner = host.querySelector(':scope > a, :scope > button');
      if (inner) target = inner;
    }
    if (target.dataset.ar === undefined) target.dataset.ar = target.innerHTML;
    items.push({ target: target, en: clean(host.dataset.en) });
  });

  function setLang(lang) {
    var isEn = lang === 'en';
    root.setAttribute('lang', isEn ? 'en' : 'ar');
    root.setAttribute('dir', isEn ? 'ltr' : 'rtl');

    items.forEach(function (it) {
      it.target.innerHTML = isEn ? it.en : it.target.dataset.ar;
    });

    var t = isEn ? body.dataset.titleEn : body.dataset.titleAr;
    if (t) document.title = t;
    var meta = document.querySelector('meta[name="description"]');
    var d = isEn ? body.dataset.descEn : body.dataset.descAr;
    if (meta && d) meta.setAttribute('content', d);

    var label = document.getElementById('langLabel');
    if (label) label.textContent = isEn ? 'ع' : 'EN';

    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* التخزين غير متاح */ }
    document.dispatchEvent(new CustomEvent('si-lang-change', { detail: { lang: lang } }));
  }

  var saved = null;
  try { saved = localStorage.getItem(STORE_KEY); } catch (e) { /* تجاهل */ }
  if (saved !== 'ar' && saved !== 'en') {
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
