marked.setOptions({sanitize: true, gfm: true, breaks: true})

const renderMarkdown = async function(e) {
  let result = document.querySelector('#results');
  let domString = marked(this.value);
  try {
    window.localStorage.setItem('marker', this.value);
  } catch {
    //noop
  }
  let dom = document.implementation.createHTMLDocument('markdown');
  dom.open();
  dom.write(domString);
  dom.close();
  //import to temp dif
  let tempDiv = document.createElement('div');
  tempDiv.setAttribute('id', 'results');
  for (let el of dom.body.childNodes) {
    tempDiv.appendChild(document.importNode(el, true));
  }
  dom = null;
  // syntax highlight
  for (let codeBlock of tempDiv.querySelectorAll('pre code[class^=language]')) {
    await new Promise((resolve, reject) => {
      lang = codeBlock.className.replace('language-', '');
      codeBlock.dataset.language = lang;
      Rainbow.color(codeBlock.parentNode, resolve);
    })
  }
  // diff
  let dd = new diffDOM();
  let diff = dd.diff(result, tempDiv);
  window.requestAnimationFrame(() => {
    dd.apply(result, diff);
    tempDiv = null;
  })
}

document.addEventListener('DOMContentLoaded', () => {
  Rainbow.defer = true;
  let textarea = document.querySelector('textarea');
  try {
    textarea.value = window.localStorage.getItem('marker');
    renderMarkdown.call(textarea);
  } catch {
    //noop
  }
  textarea.addEventListener('input', renderMarkdown);
})
