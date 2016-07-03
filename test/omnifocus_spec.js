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

  it('should list tasks', function(done) {
    connector.projects(function(err, projects) {
      var project = projects[Object.keys(projects)[0]]
      connector.tasks(project, function(err, tasks) {
        osa(function(project){
          var of = Application('OmniFocus')
          var doc = of.defaultDocument

          var project = doc.flattenedProjects.whose({ id: project.id })[0]
          var tasks = project.rootTask.flattenedTasks

          var result = []
          for(i = 0; i < tasks.length; i++) {
            var task = tasks[i]
            result[i] = {
              id: task.id(),
              done: task.completed(),
              name: task.name()
            }
          }

          return result
        }, project,
        function(err, expectedTasks, log){
          if(err) console.log(err)
          expect(tasks).to.deep.equal(expectedTasks)
          done()
        })
      })
    })
  })
})
