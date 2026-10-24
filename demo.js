// Demo-only form: validates in the browser and shows a demo notice.
// Intentionally makes no network requests and stores nothing
// (no fetch/XHR, no localStorage/sessionStorage/cookies, no logging).
(function () {
  var form = document.getElementById('demo-form');
  var result = document.getElementById('demo-result');
  if (!form || !result) return;

  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var rules = {
    nombre: {
      validate: function (v) { return v.trim().length > 0; },
      message: 'Escribe tu nombre.'
    },
    email: {
      validate: function (v) { return EMAIL_RE.test(v.trim()); },
      message: v_empty_or_invalid
    }
  };

  function v_empty_or_invalid(input) {
    return input.value.trim() === ''
      ? 'Escribe tu correo electrónico.'
      : 'Revisa el formato del correo (por ejemplo, nombre@dominio.com).';
  }

  function showError(input, message) {
    var errorEl = document.getElementById(input.id + '-error');
    input.setAttribute('aria-invalid', 'true');
    errorEl.textContent = message;
    errorEl.hidden = false;
  }

  function clearError(input) {
    var errorEl = document.getElementById(input.id + '-error');
    input.removeAttribute('aria-invalid');
    errorEl.textContent = '';
    errorEl.hidden = true;
  }

  // Clear each error as soon as the visitor fixes that field.
  Array.prototype.forEach.call(form.elements, function (el) {
    if (!el.name || !rules[el.name]) return;
    el.addEventListener('input', function () {
      if (el.getAttribute('aria-invalid') === 'true' && rules[el.name].validate(el.value)) {
        clearError(el);
      }
    });
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var firstInvalid = null;

    Object.keys(rules).forEach(function (name) {
      var input = form.elements[name];
      var rule = rules[name];
      if (rule.validate(input.value)) {
        clearError(input);
      } else {
        var msg = typeof rule.message === 'function' ? rule.message(input) : rule.message;
        showError(input, msg);
        if (!firstInvalid) firstInvalid = input;
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    // Valid demo submission: no data is sent or saved. Only the notice is shown.
    form.hidden = true;
    result.hidden = false;
    result.setAttribute('tabindex', '-1');
    result.focus();
  });
})();
