function parse(jsonString) {
  var trello = JSON.parse(jsonString)
  var result = {}
  for(i = 0; i < trello.length; i++) {
    var item = trello[i]
    result[item.name] = item
  }

  return result
}

module.exports = {
  parse: parse
}
