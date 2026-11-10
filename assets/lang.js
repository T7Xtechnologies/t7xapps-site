// Idioma da página: ?lang= na URL, depois a escolha salva, depois o idioma do navegador (EN como padrão).
(function () {
  var LANGS = ['pt', 'en', 'es'];
  var TITLES = window.PAGE_TITLES || {};
  function pick() {
    var q = new URLSearchParams(location.search).get('lang');
    if (LANGS.indexOf(q) >= 0) return q;
    try { var s = localStorage.getItem('lang'); if (LANGS.indexOf(s) >= 0) return s; } catch (e) {}
    var nav = (navigator.languages || [navigator.language || 'en']);
    for (var i = 0; i < nav.length; i++) {
      var code = String(nav[i]).slice(0, 2).toLowerCase();
      if (LANGS.indexOf(code) >= 0) return code;
    }
    return 'en';
  }
  function apply(lang) {
    var html = document.documentElement;
    LANGS.forEach(function (l) { html.classList.remove('l-' + l); });
    html.classList.add('l-' + lang);
    html.lang = lang === 'pt' ? 'pt-BR' : lang;
    if (TITLES[lang]) document.title = TITLES[lang];
    var buttons = document.querySelectorAll('.lang button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].setAttribute('aria-pressed', String(buttons[i].dataset.set === lang));
    }
  }
  apply(pick());
  document.addEventListener('DOMContentLoaded', function () {
    apply(pick());
    var buttons = document.querySelectorAll('.lang button');
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener('click', function () {
        var lang = this.dataset.set;
        try { localStorage.setItem('lang', lang); } catch (e) {}
        var url = new URL(location.href); url.searchParams.set('lang', lang);
        history.replaceState(null, '', url);
        apply(lang);
      });
    }
  });
})();
