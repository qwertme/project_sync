"use strict";

var sync = require('./sync')
var omniFocus = require('./omnifocus')
var trello = require('./trello')

sync.matchProjects(trello, omniFocus, function(err, projects) {
  console.log(projects)
})

