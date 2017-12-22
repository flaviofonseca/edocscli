'use strict'

module.exports = function (dep) {
  let result = {}

  result.debug = function (message, tipo) {
    const {console} = dep
    const {yellow, blue, gray, red, green, white} = dep.colors

    if (tipo === 'error') {
      console.log(yellow('[Edocs-CLI] ') + (message ? red(' ' + message) : ''))
    } else if (tipo === 'sucess') {
      console.log(yellow('[Edocs-CLI] ') + (message ? green(' ' + message) : ''))
    } else if (tipo === 'info') {
      console.log(yellow('[Edocs-CLI] ') + (message ? blue(' ' + message) : ''))
    } else {
      console.log(yellow('[Edocs-CLI] ') + (message ? white(' ' + message) : ''))
    }
  }

  return result
}
