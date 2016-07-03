var osa = require('osa')

projects = function(callback) {
  osa(function() {
    var of = Application('OmniFocus')
    var doc = of.defaultDocument
    var result = {}

    var projects = doc.flattenedProjects
    for(i = 0; i < projects.length; i++) {
      var project = projects[i]
      var name = project.name()
      result[name] = {
        id: project.id(),
        name: name
      }
    }
    return result
  }, function(err, projects, log) {
    if(err) {
      console.log(err)
      throw err
    }
    callback(err, projects)
  })
}

tasks = function(project, callback) {
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
  function(err, tasks, log){
    if(err) {
      console.log(err)
      throw err
    }
    callback(err, tasks)
  })
}
module.exports = {
  name: 'OmniFocus',
  projects: projects,
  tasks: tasks
}
