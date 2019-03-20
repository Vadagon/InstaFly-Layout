app.controller('editCtrl', function($scope, $rootScope) {
  $scope.selected_option = $rootScope.app.filters[0];
  $scope.selected_a = 0;
  $scope.ta_maxLength = 400;
  $scope.ta_minLength = 40;
  $scope.selected = function(a) {
    if($scope.selected_a==a){
      return;
    }else if (a > 0 && !$rootScope.data.user.isMember) {
      $rootScope.app.alerts.showError2 = !0;
      return;
    }else if(a > 2 && $rootScope.data.user.isMember){
      $rootScope.app.alerts.showError3 = !0;
      return;
    }

    $scope.active_btn = !0;
    $scope.hideCaptions = !1;

    if (a == 1) {
      $scope.hideCaptions = !0;
    }else {
      if ($scope.newTask.textarea.length < $scope.ta_minLength || $scope.newTask.textarea.length > $scope.ta_maxLength) {
        $scope.active_btn = false;
      }else{
        $scope.hideCaptions = !0;
      }
    }

    $rootScope.newTask.type = $rootScope.app.filters[a][0];
    $scope.selected_option = $rootScope.app.filters[a];
    $scope.selected_a = a;
    $scope.$apply();
  }

  // Якшо вводиш симовли в текстарію
  $rootScope.$watch('newTask.textarea.length', function(){
    if ($rootScope.newTask.textarea.length >= $scope.ta_minLength && $rootScope.newTask.textarea.length < $scope.ta_maxLength) {
      $scope.active_btn = !0
      $scope.hideCaptions = !0
    }else{
      $scope.active_btn = !1
    }
  })
  $rootScope.saveTask = function() {
    if(!$scope.active_btn){
      return;
    }
    if ($rootScope.newTask.textarea == undefined) {
      $rootScope.newTask.textarea = '';
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
