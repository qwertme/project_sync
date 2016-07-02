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
