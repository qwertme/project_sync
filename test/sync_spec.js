var expect = require('chai').expect

var sync = require('../lib/sync.js')

describe("Sync", function() {
  it('should match projects', function(done) {
    var connectorA = {
      name: 'OmniFocus',
      projects: function(callback) {
        callback(null, {
          'project A': { 'name':'project A', 'id': 'abc123' },
          'project C': { 'name':'project C', 'id': 'cde456' }
        })
      }
    }
    var connectorB = {
      name: 'Trello',
      projects: function(callback) {
        callback(null, {
          'project A': { 'name':'project A', 'id': 'aaa111' },
          'project B': { 'name':'project B', 'id': 'bbb222' }
        })
      }
    }

    sync.matchProjects(connectorA, connectorB, function(err, projects) {
      expect(projects).to.deep.equal({ 'project A': { 'OmniFocus':'abc123', 'Trello': 'aaa111' } })
      done()
    })
  })
})
