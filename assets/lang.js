// Política e termos: abrem sempre em inglês. Português e espanhol só com ?lang=pt ou ?lang=es (links no topo do texto).
(function () {
  var q = new URLSearchParams(location.search).get('lang');
  var lang = q === 'pt' || q === 'es' ? q : 'en';
  var html = document.documentElement;
  html.classList.remove('l-pt', 'l-en', 'l-es');
  html.classList.add('l-' + lang);
  html.lang = lang === 'pt' ? 'pt-BR' : lang;
  var titles = window.PAGE_TITLES || {};
  if (titles[lang]) document.title = titles[lang];
})();
