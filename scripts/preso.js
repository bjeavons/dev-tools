// Generated by CoffeeScript 1.7.1
(function() {
  var Preso,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  Preso = (function() {
    function Preso() {
      this.get('slides.md', (function(_this) {
        return function(text) {
          var $em, el, html, output, slide, _i, _j, _len, _len1, _ref, _ref1, _results;
          text = text.replace(/^\%(.*)\n/gm, "<aside class='notes'>\$1</aside>\n");
          html = marked(text);
          output = "";
          _ref = html.split(new RegExp(/<hr>/));
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            slide = _ref[_i];
            if (slide !== "") {
              output += _this.createSlide(slide);
            }
          }
          $em = $('.slides').append(output);
          _ref1 = _this.getFragmentableElements();
          _results = [];
          for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
            el = _ref1[_j];
            _results.push($(el).addClass('fragment'));
          }
          return _results;
        };
      })(this));
    }

    Preso.prototype.processLineRanges = function(slide) {
      var line_range;
      if (line_range = current_slide.getAttribute('data-selection')) {
        return selectCodeLines(start, end);
      }
    };

    Preso.prototype.parseCodeLineRange = function(range) {};

    Preso.prototype.forceCodeLanguage = function(lang) {
      return $('code').addClass("language-" + lang);
    };

    Preso.prototype.get = function(url, callback) {
      var request;
      request = new XMLHttpRequest();
      request.open('GET', url, false);
      request.send();
      if (request.status === 200) {
        return callback(request.responseText);
      }
    };

    Preso.prototype.getFragmentableElements = function() {
      var $el, $fragment_elements, $sections, el, ret, section, _i, _j, _len, _len1, _ref, _ref1, _results;
      $sections = $('section.fragment');
      ret = [];
      _results = [];
      for (_i = 0, _len = $sections.length; _i < _len; _i++) {
        section = $sections[_i];
        $fragment_elements = $(section).find('*');
        _ref = $fragment_elements.slice(1, +$fragment_elements.length + 1 || 9e9);
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          el = _ref[_j];
          $el = $(el);
          if (el.nodeName !== "ASIDE" && (_ref1 = el.nodeName, __indexOf.call(this.fragmentableElements(), _ref1) >= 0) && !/^\s*$/.test($el.text())) {
            ret.push(el);
          }
        }
        _results.push(ret.slice(1, +ret.length + 1 || 9e9));
      }
      return _results;
    };

    Preso.prototype.fragmentableElements = function() {
      return ["H1", "H2", "H3", "H4", "LI", "P", "A"];
    };

    Preso.prototype.createSlide = function(contents) {
      var class_str, classes, data_attrs, div, first, id, item, slide_metadata, _i, _len;
      div = document.createElement('div');
      div.innerHTML = contents;
      first = div.children[0];
      classes = [];
      data_attrs = [];
      if ((first != null ? first.nodeName : void 0) === 'P') {
        slide_metadata = first.textContent.split(" ");
        for (_i = 0, _len = slide_metadata.length; _i < _len; _i++) {
          item = slide_metadata[_i];
          switch (false) {
            case item[0] !== ".":
              classes.push(item.replace(".", ""));
              break;
            case item[0] !== "#":
              id = item.replace("#", "");
              break;
            case item.slice(0, 5) !== "data-":
              data_attrs.push(item);
          }
        }
        class_str = classes.join(" ");
        div.removeChild(first);
        contents = div.innerHTML;
      }
      id || (id = classes[0] || "");
      return "<section data-state=\"" + class_str + "\" " + (data_attrs.join(" ")) + " class=\"hbox " + class_str + "\">" + contents + "</section>";
    };

    Preso.prototype.findElement = function(selector, context) {
      var div, el;
      div = document.createElement('div');
      div.innerHTML = context;
      el = div.querySelectorAll(selector);
      return el[0];
    };

    Preso.prototype.addDebugElement = function() {
      var $debug_el, styles;
      styles = ['position:absolute', 'left:50%', 'margin-left:-480px', 'top:50%', 'margin-top:-350px', 'border:1px solid #a00', 'height:700px', 'width:960px'];
      $debug_el = "<div class=\"slide-boundry\" style=\"" + (styles.join(';')) + "\" />";
      return $('body .reveal').append($debug_el);
    };

    Preso.prototype.selectCodeLines = function() {
      var doc, range, selection, text;
      doc = document;
      selection = window.getSelection();
      range = doc.createRange();
      text = $('.present code')[0];
      range.selectNodeContents(text);
      selection.removeAllRanges();
      return selection.addRange(range);
    };

    return Preso;

  })();

  window.Preso = Preso;

}).call(this);