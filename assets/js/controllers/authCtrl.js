app.controller('authCtrl', function($scope, $rootScope) {
  console.log($scope.pass)
  $scope.instagramLogData = {
    username: '',
    password: ''
  }
  $scope.$watch('eye_pass', () => {
    if ($scope.eye_pass == true) {
      $scope.pass = "text"
    } else {
      $scope.pass = "password"
    }
  })
  $scope.instagramLogin = function() {
    $rootScope.app.alerts.loading = !0
    $.ajax({
      url: 'https://www.instagram.com/accounts/login/ajax/',
      type: 'post',
      data: {
        username: $scope.instagramLogData.username,
        password: $scope.instagramLogData.password,
        queryParams: {}
      },
      headers: {
        'x-csrftoken': data.user.csrf_token,
        'x-requested-with': 'XMLHttpRequest'
      }
    }).done(function(e) {
      if (!e.authenticated) {
        $rootScope.app.alerts.loading = !1
      }else{
        a.init();
        var interval = setInterval(function () {
          if($rootScope.data.user.username){
            $rootScope.app.alerts.loading = !1
            if (!$rootScope.data.tasks.length) {
              $rootScope.goTo('edit')
            }else{
              $rootScope.goTo('home');
            }
            clearInterval(interval);
          }
        }, 500);
      }
    }).fail(function(){
      $rootScope.app.alerts.loading = !1
    });
  }
  if (!$rootScope.data.user.username) {
    var interval = setInterval(function() {
      if ($rootScope.data.user.username) {
        !$rootScope.data.tasks.length ? $rootScope.goTo('edit') : $rootScope.goTo('home')
        clearInterval(interval);
      }
    }, 100);
  }
});
