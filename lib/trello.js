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

function cards(project, callback) {
  trello.get('/1/boards/' + project.id + '/lists', { 'cards': 'all', 'card_fields': 'id,name'}, function(err, lists) {
    if(err) {
      console.log(err)
      throw err
    }
    var projectCards = []
    var k = 0
    for(var i = 0; i < lists.length; i++) {
      var list = lists[i]

      var cards = list.cards
      for(var j = 0; j < cards.length; j++) {
        var card = cards[j]
        projectCards[k] = {
          id: card.id,
          name: card.name,
          completed: list.name === 'Done'
        }
        k++
      }
    }
    callback(null, projectCards)
  })
}

module.exports = {
  name: 'Trello',
  parse: parse,
  projects: boards,
  tasks: cards
}
