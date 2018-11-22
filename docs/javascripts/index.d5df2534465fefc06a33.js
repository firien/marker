(function() {
  var renderMarkdown;

  marked.setOptions({
    sanitize: true,
    gfm: true,
    breaks: true
  });

  renderMarkdown = function(e) {
    var dom, domString, error, result;
    result = document.querySelector('#results');
    domString = marked(this.value);
    try {
      window.localStorage.setItem('low-lite', this.value);
    } catch (error1) {
      error = error1;
      42;
    }
    dom = document.implementation.createHTMLDocument('markdown');
    dom.open();
    dom.write(domString);
    dom.close();
    return window.requestAnimationFrame(function() {
      var codeBlocks;
      while (result.firstChild) {
        result.removeChild(result.firstChild);
      }
      Array.prototype.slice.call(dom.body.childNodes).forEach(function(el) {
        return result.appendChild(document.importNode(el, true));
      });
      // syntax highlight
      codeBlocks = Array.prototype.slice.call(document.querySelectorAll('pre code[class^=language]'));
      return codeBlocks.forEach(function(cb) {
        var lang;
        lang = cb.className.replace('language-', '');
        cb.dataset.language = lang;
        return Rainbow.color(cb.parentNode);
      });
    });
  };

  document.addEventListener('DOMContentLoaded', function() {
    var error, textarea;
    textarea = document.querySelector('textarea');
    try {
      textarea.value = window.localStorage.getItem('low-lite');
      renderMarkdown.call(textarea);
    } catch (error1) {
      error = error1;
      42;
    }
    return textarea.addEventListener('input', renderMarkdown);
  });

}).call(this);
