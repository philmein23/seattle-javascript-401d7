module.exports = function(app) {
  app.directive('taskList', function() {
    return {
      restrict: 'EAC',
      replace: true,
      templateUrl: 'templates/task_list.html',
      scope: {
        tasks: '=',
        listTitle: '@'
      },
      controller: function($scope) {
        this.completeTask = function(task) {
          $scope.tasks.splice($scope.tasks.indexOf(task), 1);
        }
      }
    }
  });
};
