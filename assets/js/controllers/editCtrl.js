app.controller('editCtrl', function($scope, $rootScope) {
  $scope.selected_option = $rootScope.app.filters[0];
  let selected_option;
  $scope.ta_maxLength = 400;
  $scope.ta_minLength = 40;
  $scope.selected = function(a) {
      $scope.selected_a = a;
    if (a == 1 || a == 3 || a == 4 ) {// то шо не треба вводити в текстарію
      $scope.no = true;
      $scope.ta_maxLength = 0;
      $scope.ta_minLength = 0;
    } else {
      $scope.no = false;
      $scope.ta_maxLength = 400;
      $scope.ta_minLength = 40;
    }
  // Якщо ти не підписаний вибрав не хештег
    if (a > 0 && !$rootScope.data.user.isMember) {
      $scope.active_btn = false; // якшо не підписаний and chose not hash bnt is not active
      $scope.no = true;
      $rootScope.app.alerts.showError2 = !0;
      $('.task_filter textarea').prop( "disabled", true );
      return;
    } else {
      $rootScope.app.alerts.showError2 = !1;
      $('.task_filter textarea').prop( "disabled", false );
    }

      if (a == 2 && !$rootScope.data.user.isMember) {
          $scope.active_btn = false;
          $scope.$apply();
      }
      else {
        $scope.active_btn = true;
      }
    // ЯКЩО вибрав за фоловерами і ти підписаний або ні
    if (a > 2 && !!$rootScope.data.user.isMember) {
      $scope.active_btn = false;
      $rootScope.app.alerts.showError3 = !0;
      return;
    }
     else {
      $rootScope.app.alerts.showError3 = !1;
    }
    $rootScope.newTask.type = $rootScope.app.filters[a][0];
    $scope.selected_option = $rootScope.app.filters[a];
    // $scope.$apply();
  }

  // Якшо вводиш симовли в текстарію
  $rootScope.$watch('newTask.textarea.length',()=>{
    if ($rootScope.newTask.textarea.length >= $scope.ta_minLength && $scope.selected_a != 2) {
      $scope.active_btn = true;
    }
    else {
      $scope.active_btn = false;
    }
  })
  $rootScope.saveTask = function() {
    if ($rootScope.newTask.textarea.length == undefined) {
      $rootScope.newTask.textarea.length = 0;
    }
    if ($rootScope.newTask.textarea.length < $scope.ta_minLength || $scope.selected_a == 3 || $scope.selected_a == 4 || $scope.selected_a > 0 && !$rootScope.data.user.isMember) {
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
