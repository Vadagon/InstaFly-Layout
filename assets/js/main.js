let storage = window.localStorage;
console.log(storage)
let payed = 0;
// let pro_stor = storage.getItem('pro');
if (payed == 1) {
    pro_stor = "pro.html";
    storage.setItem('pro', 'pro.html')
} else {
    pro_stor = "home.html";
}
let app = angular.module("Routing", ["ngRoute", 'ngAnimate']);
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
        templateUrl: "logo.html",
    }).when("/home", {
        templateUrl: pro_stor,
    }).when("/edit", {
        templateUrl: "edit.html",
    }).when("/logo", {
        templateUrl: "logo.html",
    }).when("/card", {
        templateUrl: "card.html",
    }).when("/info", {
        templateUrl: "info.html",
    }).when("/auth", {
        templateUrl: "auth.html",
    }).when("/liked", {
        templateUrl: "liked.html",
    }).when("/lessons:count_less", {
        templateUrl: "lessons.html",
    }).when("/extension", {
        templateUrl: "extension.html",
    }).when("/settings", {
        templateUrl: "settings.html",
    }).when("/list_lessons", {
        templateUrl: "list_lessons.html",
    }).when("/welcome", {
        templateUrl: "welcome.html",
    }).when("/about", {
        templateUrl: "about.html",
    }).otherwise({
        redirectTo: '/'
    });
});
app.run(($rootScope) => {

    $rootScope.window = window;
    $rootScope.document = document;
    $rootScope.data = {
      tasks: [],
      feed: [],
      status: 'Sleeping'
    }
    $rootScope.app = {
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
        api.sendMessage({
            why: "getData"
        }, function(response) {
            if (!cb) {
                console.log(response)
                $rootScope.data = response;
                $rootScope.$apply();
                if(!$rootScope.data.user.username){
                  $rootScope.goTo('extension')
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
    $rootScope.get();
    setInterval(function() {
        $rootScope.get(function(e){
          if($rootScope.data.feed.length != e.feed.length || $rootScope.data.status != e.status || $rootScope.data.user.username != e.user.username) {
            $rootScope.data.feed = e.feed;
            $rootScope.data.status = e.status;
            $rootScope.data.user = e.user;
            $rootScope.$apply();
          }
        })
    }, 1000);


    $rootScope.saveTask = function(){
      if ($rootScope.app.taskFunc == 'add') {
        $rootScope.data.tasks.push(angular.copy($rootScope.newTask))
      } else {
        $rootScope.data.tasks[$rootScope.app.taskFunc] = angular.copy($rootScope.newTask);
      }
      $rootScope.save();
    }
    $rootScope.save = function(e) {
        api.sendMessage({
            why: "setData",
            data: angular.copy($rootScope.data)
        });
    }
    $rootScope.pay = function() {
        api.sendMessage({
            why: "popup",
            what: 'clicked on payement button'
        }, function() {
            $('form').submit();
        });
    }
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
    })
})
app.controller('indexCtrl', function($scope, $rootScope) {});
app.controller('editCtrl', function($scope, $rootScope) {
    $scope.selected_option = $rootScope.app.filters[0];
    let selected_option;
    $scope.ta_maxLength = 400;
    $scope.ta_minLength = 40;
    

    $scope.selected = function(a) {
        $scope.selected_option = $rootScope.app.filters[a]
    }
});
app.controller('logoCtrl', function($scope, $rootScope) {
    $scope.loader = [
        ["animation-delay: 0.125s;   background-color:#8f2fb4"],
        ["animation-delay: 0.15s;   background-color:  #942fb2"],
        ["animation-delay: 0.175s;   background-color:#942fb2"],
        ["animation-delay: 0.2s;   background-color: #a92ea9 "],
        ["animation-delay: 0.225s;   background-color: #a92ea9"],
        ["animation-delay: 0.25s;   background-color:#ad2da7"],
        ["animation-delay: 0.275s;   background-color: #ad2da7"],
        ["animation-delay: 0.3s;   background-color: #a62eaa"],
        ["animation-delay: 0.325s;   background-color: #a62eaa"],
        ["animation-delay: 0.35s;   background-color:  #b92da2"],
        ["animation-delay: 0.375s;   background-color:  #b92da2"],
        ["animation-delay: 0.4s;   background-color: #ce2c99"],
        ["animation-delay: 0.425s;   background-color: #ce2c99 "],
        ["animation-delay: 0.45s;   background-color: #dd2b93"],
        ["animation-delay: 0.475s;   background-color:#dd2b93 "],
        ["animation-delay: 0.5s;   background-color:#e92a89  "],
        ["animation-delay: 0.55s;   background-color: #e92a89 "],
        ["animation-delay: 0.6s;   background-color:#e92a89  "],
        ["animation-delay: 0.65s;   background-color: #e92a89 "],
        ["animation-delay: 0.7s;   background-color: #e92a89 "]
    ]
});
app.controller('cardCtrl', function($scope, $rootScope) {});
app.controller('infoCtrl', function($scope, $rootScope) {});
app.controller('proCtrl', function($scope, $rootScope) {});
app.controller('list_lessCtrl', function($scope, $rootScope) {});
app.controller('lessonsCtrl', function($scope, $rootScope) {});
app.controller('extCtrl', function($scope, $rootScope) {});
app.controller('settingsCtrl', function($scope, $rootScope) {
    $scope.dayily_limit = 500;
    $scope.dayily_limit_max = 5000;
    $scope.$watch('dayily_limit', () => {
        console.log($scope.dayily_limit, '$rootScope.dayily_limit')
    })
});
app.controller('likedCtrl', function($scope, $rootScope) {
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
app.controller('authCtrl', function($scope, $rootScope) {
    console.log($scope.pass)
    $scope.$watch('eye_pass', () => {
        if ($scope.eye_pass == true) {
            $scope.pass = "text"
        } else {
            $scope.pass = "password"
        }
    })
});
  $(function() {
      $("#ng_viev").niceScroll({
        enableobserver: true,
        smoothscroll: true, // scroll with ease movement
      sensitiverail: true,
      });
      $(".cover").niceScroll({
        enableobserver: true,
        smoothscroll: true, // scroll with ease movement
      sensitiverail: true,
      });
      $("textarea").niceScroll({
        enableobserver: true,
        smoothscroll: true, // scroll with ease movement
      sensitiverail: true,
      });
  });
