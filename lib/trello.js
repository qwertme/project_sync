var Trello = require('node-trello')
var trello = new Trello(process.env.TRELLO_DEVELOPER_PUBLIC_KEY, process.env.TRELLO_MEMBER_TOKEN)
var user = process.env.TRELLO_USER

function parse(trello) {
  var result = {}
  for(i = 0; i < trello.length; i++) {
    var item = trello[i]
    result[item.name] = item
  }
  return result
}

function boards(callback) {
  trello.get('/1/member/' + user + '/boards', { 'filter':'open', 'fields':'id,name'}, function(err, boards) {
    if(err) {
      console.log(err)
      callback(err)
      throw err
    }
    callback(null, parse(boards))
  })
}

module.exports = {
  name: 'Trello',
  parse: parse,
  projects: boards
}
