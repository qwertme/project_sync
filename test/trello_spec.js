var expect = require('chai').expect

var connector = require('../lib/trello')

describe('Trello connector', function() {
  describe('#parse', function() {
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
      var result = connector.parse(JSON.stringify(boards))
      expect(Object.keys(result).length).to.equal(2)

      for(var i = 0; i < boards.length; i++) {
        var board = boards[i]
        var expectedBoard = result[board.name]
        expect(expectedBoard.name).to.equal(board.name)
        expect(expectedBoard.id).to.equal(board.id)
      }
    })
  })
})
