// Generated by CoffeeScript 1.7.1
(function() {
  head.js("scripts/zepto.js", "reveal.js/plugin/markdown/marked.js", "scripts/preso.js", function() {
    var p;
    p = new Preso();
    p.forceCodeLanguage("php");
    Reveal.initialize({
      controls: false,
      progress: true,
      history: true,
      keyboard: true,
      loop: false,
      mouseWheel: false,
      rollingLinks: false,
      theme: 'simple',
      transition: 'none',
      dependencies: [
        {
          src: 'reveal.js/lib/js/classList.js',
          condition: function() {
            return !document.body.classList;
          }
        }, {
          src: 'reveal.js/plugin/highlight/highlight.js',
          async: true,
          callback: function() {
            return hljs.initHighlightingOnLoad();
          }
        }
      ]
    });
    return Reveal.addEventListener('slidechanged', function() {
      var current_slide;
      current_slide = $('.present')[0];
      return Preso.selectLineRanges(current_slide);
    });
  });

}).call(this);
