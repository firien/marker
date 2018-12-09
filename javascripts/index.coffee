marked.setOptions(sanitize: true, gfm: true, breaks: true)

renderMarkdown = (e) ->
  result = document.querySelector('#results')
  domString = marked(this.value)
  try
    window.localStorage.setItem('marker', this.value)
  catch error
    42
  dom = document.implementation.createHTMLDocument('markdown')
  dom.open()
  dom.write(domString)
  dom.close()
  #import to temp dif
  tempDiv = document.createElement('div')
  tempDiv.setAttribute('id', 'results')
  Array.prototype.slice.call(dom.body.childNodes).forEach((el) ->
    tempDiv.appendChild(document.importNode(el, true))
  )
  dom = null
  # syntax highlight
  codeBlocks = Array.prototype.slice.call(tempDiv.querySelectorAll('pre code[class^=language]'))
  promises = codeBlocks.map((cb) ->
    new Promise((resolve, reject) ->
      lang = cb.className.replace('language-', '')
      cb.dataset.language = lang
      Rainbow.color(cb.parentNode, resolve)
    )
  )
  Promise.all(promises).then( ->
    # diff
    dd = new diffDOM()
    diff = dd.diff(result, tempDiv)
    window.requestAnimationFrame( ->
      dd.apply(result, diff)
      tempDiv = null
    )
  )

document.addEventListener('DOMContentLoaded', ->
  Rainbow.defer = true
  textarea = document.querySelector('textarea')
  try
    textarea.value = window.localStorage.getItem('marker')
    renderMarkdown.call(textarea)
  catch error
    42
  textarea.addEventListener('input', renderMarkdown)
)
