const angular = require('angular');
const demoApp = angular.module('demoApp', []);

require('./directives')(demoApp);

demoApp.run(['$rootScope', function($rs) {
  $rs.tasks = [
    {desc: 'finish this code demo'},
    {desc: 'upload screen caps'},
    {desc: 'commit code'},
    {desc: 'create a directive assignment'}
  ];
}]);
