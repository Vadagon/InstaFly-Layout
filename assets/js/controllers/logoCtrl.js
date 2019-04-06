app.controller('logoCtrl', function($scope, $rootScope) {
  var interval = setInterval(function() {
    var bgIsReady = false;
    if(platform.name == 'chrome'){
      bgIsReady = true;
    }else{
      try{
        if(a.isReadyToInit){
          bgIsReady = true;
        }
      }catch(err){console.log(err);}
    }
    bgIsReady&&$rootScope.get(function(response){
      $('body').removeClass('hiddenHeader')
      $rootScope.data = response;
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
      $('body').removeClass('hiddenHeader')
      clearInterval(interval);

    })
  }, 600);
});
