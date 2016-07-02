var osa = require('osa')

projects = function(callback) {
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
  }, function(err, projects, log) {
    if(err) {
      console.log(err)
      throw err
    }
    callback(err, projects)
  })
}

module.exports = {
  name: 'OmniFocus',
  projects: projects
}
