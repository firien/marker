marked.setOptions(sanitize: true, gfm: true, breaks: true)
renderMarkdown = (e) ->
  result = document.querySelector('#results')
  domString = marked(this.value)
  try
    window.localStorage.setItem('low-lite', this.value)
  catch error
    42
  dom = document.implementation.createHTMLDocument('markdown')
  dom.open()
  dom.write(domString)
  dom.close()
  window.requestAnimationFrame( ->
    while (result.firstChild)
      result.removeChild(result.firstChild)
    Array.prototype.slice.call(dom.body.childNodes).forEach((el) ->
      result.appendChild(document.importNode(el, true))
    )
    # syntax highlight
    codeBlocks = Array.prototype.slice.call(document.querySelectorAll('pre code[class^=language]'))
    codeBlocks.forEach((cb) ->
      lang = cb.className.replace('language-', '')
      cb.dataset.language = lang
      Rainbow.color(cb.parentNode)
    )
  )

document.addEventListener('DOMContentLoaded', ->
  textarea = document.querySelector('textarea')
  try
    textarea.value = window.localStorage.getItem('low-lite')
    renderMarkdown.call(textarea)
  catch error
    42
  textarea.addEventListener('input', renderMarkdown)
)
