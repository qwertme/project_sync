"use strict"

var expect = require('chai').expect

var connector = require('../lib/trello')

describe('Trello connector', function() {
  it('should have name', function() {
    expect(connector.name).to.equal('Trello')
  })

  it('should list boards', function(done) {
    var Trello = require('node-trello')
    var trello = new Trello(process.env.TRELLO_DEVELOPER_PUBLIC_KEY, process.env.TRELLO_MEMBER_TOKEN)

    trello.get('/1/member/' + process.env.TRELLO_USER + '/boards', { 'filter':'open', 'fields':'id,name'}, function(err, expectedBoards) {
      if(err) {
        console.log(err)
        throw err
      }
      connector.projects(function(err, boards){
        expect(boards).to.deep.equal(connector.parse(expectedBoards))
        done()
      })
    })
  })

  it('should list cards on board', function(done) {
    var Trello = require('node-trello')
    var trello = new Trello(process.env.TRELLO_DEVELOPER_PUBLIC_KEY, process.env.TRELLO_MEMBER_TOKEN)

    connector.projects(function(err, projects) {
      var project = projects[Object.keys(projects)[0]]
      trello.get('/1/boards/' + project.id + '/lists', { 'cards': 'all', 'card_fields': 'id,name'}, function(err, lists) {
        if(err) {
          console.log(err)
          throw err
        }
        var expectedCards = []
        var k = 0
        for(var i = 0; i < lists.length; i++) {
          var list = lists[i]

          var cards = list.cards
          for(var j = 0; j < cards.length; j++) {
            var card = cards[j]
            expectedCards[k] = {
              id: card.id,
              name: card.name,
              completed: list.name === 'Done'
            }
            k++
          }
        }
        connector.tasks(project, function(err, tasks){
          expect(tasks).to.deep.equal(expectedCards)
          done()
        })
      })
    })
  })

  it('should parse boards', function() {
    var boards = [
      {
        "name":"board number one",
        "id":"abc123"
      },
      {
        "name":"board number two",
        "id":"def567"
      }
    ]
    var result = connector.parse(boards)
    expect(Object.keys(result).length).to.equal(2)

    for(var i = 0; i < boards.length; i++) {
      var board = boards[i]
      var expectedBoard = result[board.name]
      expect(expectedBoard.name).to.equal(board.name)
      expect(expectedBoard.id).to.equal(board.id)
    }
  })
})
