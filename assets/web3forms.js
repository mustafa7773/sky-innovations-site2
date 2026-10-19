/* إرسال النماذج عبر Web3Forms — ابتكارات السماء */
(function () {
  'use strict';

  function isEn() {
    return document.documentElement.getAttribute('lang') === 'en';
  }

  function handleForm(form) {
    var status = form.querySelector('[data-form-status]');
    var btn = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      /* فخ السبام: لو الحقل المخفي (botcheck) ممتلئ، لا نرسل شيئاً */
      var bot = form.querySelector('input[name="botcheck"]');
      if (bot && bot.value) return;

      if (btn) btn.disabled = true;
      if (status) {
        status.style.color = '';
        status.textContent = isEn() ? 'Sending…' : 'جارٍ الإرسال…';
      }

      var formData = new FormData(form);
      var hasFiles = false;
      formData.forEach(function (v) { if (v instanceof File && v.size > 0) hasFiles = true; });

      var request;
      if (hasFiles) {
        /* عند وجود ملفات مرفوعة، يجب إرسال multipart/form-data كما هو دون تحويله لـ JSON */
        request = fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData
        });
      } else {
        request = fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(Object.fromEntries(formData))
        });
      }

      request
        .then(function (r) { return r.json(); })
        .then(function (data) {
          if (data.success) {
            if (status) {
              status.style.color = '#1a7f37';
              status.textContent = isEn()
                ? 'Thank you — your submission has been sent.'
                : 'شكراً لك — تم إرسال طلبك بنجاح.';
            }
            form.reset();
          } else {
            if (status) {
              status.style.color = '#c0392b';
              status.textContent = isEn()
                ? 'Something went wrong. Please try again.'
                : 'حدث خطأ ما، الرجاء المحاولة مرة أخرى.';
            }
          }
        })
        .catch(function () {
          if (status) {
            status.style.color = '#c0392b';
            status.textContent = isEn()
              ? 'Network error. Please try again.'
              : 'خطأ في الاتصال، الرجاء المحاولة مرة أخرى.';
          }
        })
        .finally(function () {
          if (btn) btn.disabled = false;
        });
    });
  }

  document.querySelectorAll('form[data-web3forms]').forEach(handleForm);
})();
