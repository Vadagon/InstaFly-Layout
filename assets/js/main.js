let app = angular.module("Routing", ["ngRoute", 'ngAnimate']);
app.directive("pagination", function() {
  return {

      template : '<a  ng-click="select($index);" ng-repeat="x in less_preview"><div ng-class="{active_dot: scrolled == $index}" class="dot_info   mar5"></div></a>'
  };
});
//Routing
app.config(['$compileProvider', function ($compileProvider) {
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|local|data|chrome-extension):/);
}]);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
app.config(($routeProvider) => {
    $routeProvider
    .when("/", {
        templateUrl: "logo.html"
    }).when("/home", {
        templateUrl: "home.html"
    }).when("/pro", {
      templateUrl: "pro.html"
    }).when("/edit", {
        templateUrl: "edit.html"
    }).when("/logo", {
        templateUrl: "logo.html"
    }).when("/card", {
        templateUrl: "card.html"
    }).when("/info", {
        templateUrl: "info.html"
    }).when("/auth", {
        templateUrl: "auth.html"
    }).when("/liked", {
        templateUrl: "liked.html"
    }).when("/lessons:count_less", {
        templateUrl: "lesson.html"
    }).when("/extension", {
        templateUrl: "extension.html"
    }).when("/settings", {
        templateUrl: "settings.html"
    }).when("/lessons", {
        templateUrl: "lessons.html"
    }).when("/welcome", {
        templateUrl: "welcome.html"
    }).when("/about", {
        templateUrl: "about.html"
    }).otherwise({
        redirectTo: '/'
    });
});
app.run(($rootScope, $interval) => {
    $rootScope.ideas = ideas;
    $rootScope.window = window;
    $rootScope.document = document;
    $rootScope.data = {
      tasks: [],
      feed: [],
      status: 'Sleeping',
      user: {}
    }
    window.app = $rootScope.app = {
      alerts: {
        showError1: !1,
        showError2: !1,
        showError3: !1,
        goProPopup: false
      },
      filters: [
        ["hashtag", "Like by hashtags"],
        ["feed", "Like my feed"],
        ["location", "Like by locations"],
        ["followers", "Like user's followers"],
        ["following", "Like user's followings"]
      ],
      taskFunc: 'add'
    }

    $rootScope.APPNAME = "InstaFly";
    $rootScope.status1 = "sleeping";
    $rootScope.tasks_count = 1;
    $rootScope.liked = 495;
    $rootScope.max_likes_per_day = 500;
    $rootScope.interval = 0;
    $rootScope.a = 0;
    $rootScope.Enabled_disabled = true;
    $rootScope.goBack = function() {
        window.history.back();
    }
    window.blankTask = {
        isEnabled: !0,
        type: 'hashtag',
        textarea: ''
    }
    $rootScope.newTask = window.blankTask;
    $rootScope.taskFunc = function(e) {
        $rootScope.app.taskFunc = e;
        if (e !== 'add') {
            console.log($rootScope.app.taskFunc);
            $rootScope.newTask = angular.copy($rootScope.data.tasks[$rootScope.app.taskFunc])
            console.log($rootScope.newTask);
        } else {
            $rootScope.newTask = angular.copy(window.blankTask)
        }
        window.location.href = '#!edit';
    }
    $rootScope.get = function(cb) {
        api.runtime.sendMessage({
            why: "getData"
        }, function(response) {
            response.user.isMember = !1;
            if (!cb) {
                $rootScope.data = response;
                $rootScope.$apply();
                if(!$rootScope.data.user.policy){
                  $rootScope.goTo('welcome')
                  return;
                }
                if(!$rootScope.data.user.username){
                  platform.name=='chrome'?$rootScope.goTo('extension'):$rootScope.goTo('auth')
                  return;
                }
                if(!$rootScope.data.tasks.length){
                  $rootScope.goTo('edit')
                  return;
                }
                $rootScope.goTo('home')
            } else {
                cb(response)
            }
        });
    }
    $rootScope.$watch('data.tasks', function(newValue, oldValue) {
        $rootScope.save();
    }, true);
    $rootScope.$watch('app.alerts', function(newValue, oldValue) {
      setTimeout(function () {
        $('body').niceScroll().resize();
      }, 200);
    }, true);

    $interval(function() {
        $rootScope.get(function(e){
          if($rootScope.data.feed.length != e.feed.length || $rootScope.data.status != e.status || $rootScope.data.user.username != e.user.username) {
            console.log('updated');
            $rootScope.data.feed = e.feed;
            $rootScope.data.status = e.status;
            $rootScope.data.user = e.user;
            // $rootScope.data.user.isMember = !0;
          }
        })
    }, 1000);


    $rootScope.saveTask = function(){
      if($rootScope.newTask.textarea.length < 40){
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
    $rootScope.save = function(e) {
        api.runtime.sendMessage({
            why: "setData",
            data: angular.copy($rootScope.data)
        });
    }
    $rootScope.pay = pay;
    $rootScope.goTo = function(e){
      window.location.href = '#!'+e;
    }
    $rootScope.log = function(){
      setTimeout(function () {
        $('#myonoffswitch').prop('checked', $rootScope.newTask.isEnabled);
      }, 100);
    }


    $rootScope.goBack = function goBack() {
        // window.history.back();
        window.location.href = '#!home';
    }
    // ДЛЯ СТОРІНКИ НАСТРОЙКИ
    $rootScope.minus = function() {
        if ($rootScope.interval > 0) {
            $rootScope.interval--;
        }
    }
    $rootScope.plus = function() {
        $rootScope.interval++;
    }


    $rootScope.$on('$routeChangeStart', function(event, current, next, previous, reject) {
        $rootScope.count_less = arguments[1].params.count_less;
        if ($rootScope.count_less != undefined) {
            $rootScope.count_less = $rootScope.count_less.slice(1)
            console.log($rootScope.count_less)
        }
        var path = current.$$route.originalPath;
        $rootScope.path = path.slice(1).split(':')[0];
        if ( /(lessons:|info|edit|about|settings|liked)/ig.test(path) ) {
          $rootScope.header_show = true;
        }
        else{
            $rootScope.header_show = false;
        }
    })
    var intervalInit = setInterval(function () {
      if(!!a){
        if(a.isReadyToInit){
          clearInterval(intervalInit);
          $rootScope.get();
        }
      }
    }, 10);
    $('body').niceScroll();
})
app.controller('indexCtrl', function($scope, $rootScope) {});
app.controller('editCtrl', function($scope, $rootScope) {
    $scope.selected_option = $rootScope.app.filters[0];
    let selected_option;
    $scope.ta_maxLength = 400;
    $scope.ta_minLength = 40;

    $scope.selected = function(a) {
  //     if (a == 1 || a == 3 || a == 4) {
  //   $scope.no = true;
  //     $scope.ta_maxLength = 0;
  //     $scope.ta_minLength = 0;
  // }
  // else {
  //   $scope.no = false;
  //     $scope.ta_maxLength = 400;
  //     $scope.ta_minLength = 40;
  // }
      if(a > 0 && !$rootScope.data.user.isMember){
        $rootScope.app.alerts.showError2 = !1;
        return;
      }
      if(a > 2 && !!$rootScope.data.user.isMember){
        $rootScope.app.alerts.showError3 = !0;
        return;
      }
      $scope.selected_option = $rootScope.app.filters[a]
    }
});
app.controller('logoCtrl', function($scope, $rootScope) {
  console.log($rootScope.data);
  if(!$rootScope.data.user.username){
    var interval = setInterval(function () {
      if($rootScope.data.user.username){
        !$rootScope.data.tasks.length?$rootScope.goTo('edit'):$rootScope.goTo('home')
        clearInterval(interval);
      }
    }, 100);
  }

});
app.controller('cardCtrl', function($scope, $rootScope) {
  $($rootScope.data.user.form).insertAfter('#ng_viev').css('display', 'none').attr('target', '_blank');
  $('.content_card .cover_wrapper').niceScroll('.cover');
});
app.controller('homeCtrl', function($scope, $rootScope, $location) {
  $rootScope.less_preview = [0, 1];
  var path = $location.path();

  if (path == '/home') {
    $('.home_lessons_wrapper .boxscroll').niceScroll('.wrap');
    if ($scope.selected == undefined) {
      $scope.selected = 0;
    }
    $scope.select = function(index) {
      $scope.selected = index;
      $('.home_lessons_wrapper .boxscroll').getNiceScroll(0).doScrollLeft($('.home_lessons')[index].offsetLeft);
    };
    $('.boxscroll').scroll(function() {
      // var scrolled_x = $('.wrap').css('transform').slice(20, -4);
      // scrolled_x = Math.ceil(Number(scrolled_x));
      // if (scrolled_x == 0) {
      //   scrolled_x = 0;
      // }
      // var pos_first = $('.home_lessons')[0].offsetLeft
      // pos_first = Math.ceil(Number(pos_first));
      // $scope.scrolled = (scrolled_x - pos_first) / 360;
      // $scope.$apply(() => {
      //   $scope.scrolled = Math.ceil($scope.scrolled)
      //
      // })
    })
  }
  if (path == '/lessons') {
    $('.list_wrapper .lessons_title_scroll').niceScroll('.wrap');
    if ($scope.selected1 == undefined) {
      $scope.selected1 = 0;
    }
    $scope.select1 = function(index) {
      $scope.selected1 = index;
      $('.lessons_title_scroll').getNiceScroll(0).doScrollLeft($('.lesson_container')[index].offsetLeft);
    };
    $('.lessons_title_scroll').scroll(function() {
      var scrolled_x = $('.less_mazafaka').css('transform').slice(20, -4);
      scrolled_x = Math.ceil(Number(scrolled_x));
      if (scrolled_x == 0) {
        scrolled_x = 0;
      }
      var pos_first = $('.less_mazafaka')[0].offsetLeft
      pos_first = Math.ceil(Number(pos_first));
      $scope.scrolled1 = (scrolled_x - pos_first) / 360;
      $scope.$apply(() => {
        $scope.scrolled1 = Math.ceil($scope.scrolled1)
      })

    })

  }
});
app.controller('infoCtrl', function($scope, $rootScope) {});
app.controller('proCtrl', function($scope, $rootScope) {});
app.controller('list_lessCtrl', function($scope, $rootScope) {});
app.controller('lessonsCtrl', function($scope, $rootScope) { })
app.controller('extCtrl', function($scope, $rootScope) {});
app.controller('welcomeCtrl', function($scope, $rootScope) {
  $scope.acceptPrivacy = function(){
    $rootScope.data.user.policy = !0;
    $rootScope.save();
    if(!$rootScope.data.user.username){
      platform.name=='chrome'?$rootScope.goTo('extension'):$rootScope.goTo('auth');
      return;
    }
    if(!$rootScope.data.tasks.length){
      $rootScope.goTo('edit')
      return;
    }
    $rootScope.goTo('home')
  }
});
app.controller('aboutCtrl', function($scope, $rootScope) {
  $('.about_wrapper .boxscroll').niceScroll('.wrap');
  $rootScope.F = true;
  $rootScope.fix = [{
      'date': '07:07 03.03.2019',
      'fix': 'Beta-testing We are improving app now.'
  }, {
      'date': '12:20  04.03.2019',
      'fix': 'Fixed some bugs, lessons and settings added.'
  }, {
      'date': '14:25 04.03.2019',
      'fix': 'Fixed redirect'
  }, {
      'date': '20:10 05.03.2019',
      'fix': 'NEW functional! Impoved design!'
  }, {
      'date': '11:30 08.03.2019',
      'fix': 'Fixed some bugs...'
  }, {
      'date': '14:21 08.03.2019',
      'fix': 'Added liked by followers and following.'
  },
   {
      'date': '12:16 17.03.2019',
      'fix': 'New pages and more cool things!'
  }
  , {
      'date': '22:57 13.03.2019',
      'fix': 'Improved liking functions!, and fixed some bugs. Some design changes'
  }]
  $rootScope.fix.reverse()
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
    setInterval(function () {
      $('body').niceScroll().resize();
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
  if(!$rootScope.data.user.username){
    var interval = setInterval(function () {
      if($rootScope.data.user.username){
        !$rootScope.data.tasks.length?$rootScope.goTo('edit'):$rootScope.goTo('home')
        clearInterval(interval);
      }
    }, 100);
  }
});
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
    $scope.instagramLogin = function(){
      $rootScope.goTo('logo');
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
        if(!e.authenticated){
          $rootScope.goTo('auth');
        }
      });
    }
    if(!$rootScope.data.user.username){
      var interval = setInterval(function () {
        if($rootScope.data.user.username){
          !$rootScope.data.tasks.length?$rootScope.goTo('edit'):$rootScope.goTo('home')
          clearInterval(interval);
        }
      }, 100);
    }
});
