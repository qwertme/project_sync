var expect = require('chai').expect

var osa = require('osa')
var connector = require('../lib/omnifocus')

describe('Omnifocus connector', function() {
  it('should have name', function() {
    expect(connector.name).to.equal('OmniFocus')
  })

  it('should list projects', function(done) {
    osa(function() {
      var app = Application.currentApplication()
      app.includeStandardAdditions = true;
      var of = Library('OmniFocus')
      var result = {}

      var projects = of.allProjects()
      for(i = 0; i < projects.length; i++) {
        var project = projects[i]
        var name = project.name()
        result[name] = {
          id: project.id(),
          name: name
        }
      }
      return result
    }, function(err, expectedProjects, log) {
      connector.projects(function(err, projects){
        expect(projects).to.deep.equal(expectedProjects)
        done()
      })
    })
  })
})
