"use strict"

var osa = require('osa')

var allProjects = null
var allTasks = null

var load = function(callback) {
  osa(function() {
    var of = Application('OmniFocus')
    var doc = of.defaultDocument
    var result = {
      projects: {},
      tasks: {}
    }

    var projects = doc.flattenedProjects
    for(i = 0; i < projects.length; i++) {
      var project = projects[i]
      var name = project.name()
      var id = project.id()
      result.projects[name] = { id: id, name: name }
      result.tasks[id] = []

      var tasks = project.rootTask.flattenedTasks
      for(j = 0; j < tasks.length; j++) {
        var task = tasks[j]
        result.tasks[id][j] = {
          id: task.id(),
          done: task.completed(),
          name: task.name()
        }
      }
    }
    return result
  }, function(err, result, log) {
    if(err) {
      console.log(err)
      throw err
    }
    allProjects = result.projects
    allTasks = result.tasks
    callback()
  })
}

var projects = function(callback) {
  if(allProjects == null){
    load(function() {
      callback(null, allProjects)
    })
  } else {
    callback(null, allProjects)
  }
}

var tasks = function(project, callback) {
  if(allTasks == null){
    load(function() {
      callback(null, allTasks[project.id])
    })
  } else {
    callback(null, allTasks[project.id])
  }
}

module.exports = {
  name: 'OmniFocus',
  projects: projects,
  tasks: tasks
}
