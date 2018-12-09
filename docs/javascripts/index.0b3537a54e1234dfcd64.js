(function() {
  var renderMarkdown;

  marked.setOptions({
    sanitize: true,
    gfm: true,
    breaks: true
  });

  renderMarkdown = function(e) {
    var codeBlocks, dom, domString, error, promises, result, tempDiv;
    result = document.querySelector('#results');
    domString = marked(this.value);
    try {
      window.localStorage.setItem('marker', this.value);
    } catch (error1) {
      error = error1;
      42;
    }
    dom = document.implementation.createHTMLDocument('markdown');
    dom.open();
    dom.write(domString);
    dom.close();
    //import to temp dif
    tempDiv = document.createElement('div');
    tempDiv.setAttribute('id', 'results');
    Array.prototype.slice.call(dom.body.childNodes).forEach(function(el) {
      return tempDiv.appendChild(document.importNode(el, true));
    });
    dom = null;
    // syntax highlight
    codeBlocks = Array.prototype.slice.call(tempDiv.querySelectorAll('pre code[class^=language]'));
    promises = codeBlocks.map(function(cb) {
      return new Promise(function(resolve, reject) {
        var lang;
        lang = cb.className.replace('language-', '');
        cb.dataset.language = lang;
        return Rainbow.color(cb.parentNode, resolve);
      });
    });
    return Promise.all(promises).then(function() {
      var dd, diff;
      // diff
      dd = new diffDOM();
      diff = dd.diff(result, tempDiv);
      return window.requestAnimationFrame(function() {
        dd.apply(result, diff);
        return tempDiv = null;
      });
    });
  };

  document.addEventListener('DOMContentLoaded', function() {
    var error, textarea;
    Rainbow.defer = true;
    textarea = document.querySelector('textarea');
    try {
      textarea.value = window.localStorage.getItem('marker');
      renderMarkdown.call(textarea);
    } catch (error1) {
      error = error1;
      42;
    }
    return textarea.addEventListener('input', renderMarkdown);
  });

}).call(this);
