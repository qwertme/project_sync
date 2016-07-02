
var matchProjects = function (connectorA, connectorB, callback) {
  var matchedProjects = {}
  connectorA.projects(function(err, projectsA) {
    connectorB.projects(function(err, projectsB) {
      var namesA = Object.keys(projectsA)
      namesA.forEach(function(name) {
        var projectA = projectsA[name]
        if(typeof projectsB[projectA.name] !== "undefined") {
          var projectB = projectsB[projectA.name]
          console.log('Found match => ' + projectA.id + ' = ' +  projectB.id + ' name: ' + projectA.name )
          matchedProjects[projectA.name] = {}
          matchedProjects[projectA.name][connectorA.name] =  projectA.id
          matchedProjects[projectA.name][connectorB.name] =  projectB.id
        }
      })
      callback(null, matchedProjects)
    })
  })
}


module.exports = {
  matchProjects: matchProjects
}
