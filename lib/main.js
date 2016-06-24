"use strict";

var app = Application.currentApplication()
app.includeStandardAdditions = true;

function fetch(command) {
  var trello = eval(app.doShellScript(command))

  var result = {}
  for(i = 0; i < trello.length; i++) {
    var item = trello[i]
    result[item.name] = item
  }

  return result
}

function fetchTrelloBoards() {
  return fetch('trello board list -o json')
}

function fetchTrelloLists(board) {
  return fetch('trello list list -b' + board.id + ' -o json')
}

function fetchTasks(list) {
  return fetch('trello card list -l' + list.id + ' -o json')
}

function matchProjects(omniFocus, trelloBoards) {
  var matchedProjects = []
  var i = 0
  omniFocus.allProjects().forEach(function(project) {
    if(typeof trelloBoards[project.name()] !== "undefined") {
      var board = trelloBoards[project.name()]
      console.log('Found match => ' + project.id() + ' = ' +  board.id + ' name: ' + project.name() )
      matchedProjects[i] = {
        name: project.name(),
        board: board,
        project: project
      }
      i++
    }
  })
  return matchedProjects
}

var of = Library('OmniFocus')

var projects = matchProjects(of, fetchTrelloBoards())

for(var i = 0; i < projects.length; i++) {
  var project = projects[i]
  var lists = fetchTrelloLists(project.board)
  console.log(inspect(lists))
  console.log(lists.length)
  for(var j = 0; j < lists.length; j++) {
    var list = lists[j]
    console.log(list)
    console.log('  ' + list.name)
    var tasks = fetchTasks(list)
    for(var j = 0; j < lists.length; j++) {
      var task = tasks[i]
      console.log('    ' + task.name)
    }
  }
}
console.log('done')


function inspect(o,i){
    if(typeof i=='undefined')i='';
    if(i.length>50)return '[MAX ITERATIONS]';
    var r=[];
    for(var p in o){
        var t=typeof o[p];
        r.push(i+'"'+p+'" ('+t+') => '+(t=='object' ? 'object:'+inspect(o[p],i+'  ') : o[p]+''));
    }
    return r.join(i+'\n');
}
