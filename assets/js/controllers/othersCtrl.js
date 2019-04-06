app.controller('indexCtrl', function($scope, $rootScope) {});
app.controller('infoCtrl', function($scope, $rootScope) {});
app.controller('proCtrl', function($scope, $rootScope) {});
app.controller('list_lessCtrl', function($scope, $rootScope) {});
app.controller('lessonsCtrl', function($scope, $rootScope) {})
app.controller('extCtrl', function($scope, $rootScope) {});
app.controller('welcomeCtrl', function($scope, $rootScope) {
  $scope.acceptPrivacy = function() {
    $rootScope.data.user.policy = !0;
    $rootScope.save();
    if (!$rootScope.data.user.username) {
      platform.name == 'chrome' ? $rootScope.goTo('extension') : $rootScope.goTo('auth');
      return;
    }
    if (!$rootScope.data.tasks.length) {
      $rootScope.goTo('edit')
      return;
    }
    $rootScope.goTo('home')
  }
});
app.controller('settingsCtrl', function($scope, $rootScope) {
  $rootScope.goTo('home')
  $scope.dayily_limit = 500;
  $scope.dayily_limit_max = 5000;
  $scope.$watch('dayily_limit', () => {
    console.log($scope.dayily_limit, '$rootScope.dayily_limit')
  })
});
app.controller('likedCtrl', function($scope, $rootScope) {
  setInterval(function() {
    platform.name=='chrome'&&$('.boxscroll').niceScroll().resize();
  }, 400);
  let d = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' ');
  $scope.d = d;
  $scope.count = 0;
  $scope.liked_photos = [0];
  setInterval(() => {
    $scope.count++;
    $scope.count1 = 0;
    $scope.count1 += $scope.count;
    $scope.liked_photos.unshift($scope.count)
  }, 3000);
});
app.controller('extensionCtrl', function($scope, $rootScope) {
  if (!$rootScope.data.user.username) {
    var interval = setInterval(function() {
      if ($rootScope.data.user.username) {
        !$rootScope.data.tasks.length ? $rootScope.goTo('edit') : $rootScope.goTo('home')
        clearInterval(interval);
      }
    }, 100);
  }
});
