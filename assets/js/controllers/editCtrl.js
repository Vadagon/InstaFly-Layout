app.controller('editCtrl', function($scope, $rootScope) {
  $scope.selected_option = $rootScope.app.filters[0];

  let selected_option;
  $scope.ta_maxLength = 400;
  $scope.ta_minLength = 40;

  $scope.selected = function(a) {
    if (a == 1 || a == 3 || a == 4 ) {
      $scope.no = true;
      $scope.ta_maxLength = 0;
      $scope.ta_minLength = 0;
    } else {
      $scope.no = false;
      $scope.ta_maxLength = 400;
      $scope.ta_minLength = 40;
    }
    console.log(a, 'a' , a == 2 && $rootScope.data.user.isMember);
    if (a == 2 && !$rootScope.data.user.isMember) {
      $scope.no = true;
      $scope.ta_maxLength = 0;
      $scope.ta_minLength = 0;

    }
    console.log($rootScope.data.user.isMember,'$rootScope.data.user.isMember');

  if (a > 1 && !$rootScope.data.user.isMember) {
    $scope.no = true;
  }
    if (a > 0 && !$rootScope.data.user.isMember) {
      $rootScope.app.alerts.showError2 = !0;
      return;
    } else {
      $rootScope.app.alerts.showError2 = !1;
    }
    if (a > 2 && !!$rootScope.data.user.isMember) {
      $rootScope.app.alerts.showError3 = !0;
      return;
    }
     else {
      $rootScope.app.alerts.showError3 = !1;
    }
    $rootScope.newTask.type = $rootScope.app.filters[a][0];
    $scope.selected_option = $rootScope.app.filters[a];
    $scope.$apply();
  }
  $rootScope.saveTask = function() {
    if ($rootScope.newTask.textarea.length < $scope.ta_minLength) {
      return false;
    }
    if ($rootScope.app.taskFunc == 'add') {
      $rootScope.data.tasks.push(angular.copy($rootScope.newTask))
    } else {
      $rootScope.data.tasks[$rootScope.app.taskFunc] = angular.copy($rootScope.newTask);
    }
    $rootScope.goTo('home');
    $rootScope.save();
  }
});
