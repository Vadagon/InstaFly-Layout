app.controller('logoCtrl', function($scope, $rootScope) {
  var interval = setInterval(function() {
    var bgIsReady = false;
    if(platform.name == 'chrome'){
      bgIsReady = true;
    }else{
      if (!!a) {
        if (a.isReadyToInit) {
          bgIsReady = true;
        }
      }
    }
    bgIsReady&&$rootScope.get(function(response){
      console.log('remove');
      $rootScope.data = response;
      console.log(response);
      $rootScope.$apply();
      if (!$rootScope.data.user.policy) {
        $rootScope.goTo('welcome')
      }else if (!$rootScope.data.user.username) {
        platform.name == 'chrome' ? $rootScope.goTo('extension') : $rootScope.goTo('auth')
      }else if (!$rootScope.data.tasks.length) {
        $rootScope.goTo('edit')
      }else{
        $rootScope.goTo('home');        
      }
      $('body > div:not(#ng_viev)').removeClass('hidden')
      clearInterval(interval);

    })
  }, 200);
});
