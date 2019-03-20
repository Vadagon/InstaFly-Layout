window.location.hash = '';
var app = angular.module("Routing", ["ngRoute", 'ngAnimate']);
app.directive("pagination", function() {
  return {
    template: '<a  ng-click="select($index);" ng-repeat="x in less_preview"><div ng-class="{active_dot: scrolled == $index}" class="dot_info   mar5"></div></a>'
  };
});
//Routing
app.config(['$compileProvider', function($compileProvider) {
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
      templateUrl: "Plus membership.html"
    }).when("/info", {
      templateUrl: "info.html"
    }).when("/auth", {
      templateUrl: "auth.html"
    }).when("/liked", {
      templateUrl: "liked.html"
    }).when("/idea:count_less", {
      templateUrl: "idea.html"
    }).when("/extension", {
      templateUrl: "extension.html"
    }).when("/settings", {
      templateUrl: "settings.html"
    }).when("/idea", {
      templateUrl: "ideas.html"
    }).when("/welcome", {
      templateUrl: "welcome.html"
    }).when("/about", {
      templateUrl: "about.html"
    }).otherwise({
      redirectTo: '/'
    });
});
app.run(($rootScope, $interval) => {
  $rootScope.platform = platform;
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
  $rootScope.logOut = function(){
    $.ajax({
      url: 'https://www.instagram.com/accounts/logout/',
      type: 'post',
      data: {
        csrfmiddlewaretoken: data.user.csrf_token
      }
    })
    .always(function(){
      changeAcc()
      $rootScope.goTo('logo')
    })
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
    $rootScope.goTo('edit');
  }
  $rootScope.get = function(cb) {
    api.runtime.sendMessage({
      why: "getData"
    }, function(response) {
      response.user.isMember = !1; // 0 member // 1 not member
        cb&&cb(response)
    });
  }
  $rootScope.$watch('data.tasks', function(newValue, oldValue) {
    $rootScope.save();
  }, true);
  $rootScope.$watch('app.alerts', function(newValue, oldValue) {
    setTimeout(function() {
      platform.name=='chrome'&&$('.boxscroll').niceScroll().resize();
    }, 200);
  }, true);

  $interval(function() {
    $rootScope.get(function(e) {
      if ($rootScope.data.feed.length != e.feed.length || $rootScope.data.status != e.status || $rootScope.data.user.username != e.user.username) {
        $rootScope.data.feed = e.feed;
        $rootScope.data.status = e.status;
        $rootScope.data.user = e.user;
        !$rootScope.data.user.username&&$rootScope.goTo('logo');
        // $rootScope.data.user.isMember = !0;
      }
    })
  }, 1000);



  $rootScope.save = function(e) {
    api.runtime.sendMessage({
      why: "setData",
      data: angular.copy($rootScope.data)
    });
  }
  $rootScope.pay = pay;
  $rootScope.goTo = function(e) {
    window.location.href = '#!' + e;
  }
  $rootScope.log = function() {
    setTimeout(function() {
      $('#myonoffswitch').prop('checked', $rootScope.newTask.isEnabled);
    }, 100);
  }


  $rootScope.goBack = function goBack() {
    // window.history.back();
    $rootScope.goTo('home');
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


    if (/(idea|info|edit|about|settings|liked|card)/ig.test(path)) {
      $rootScope.header_show = true;
    } else if (/(welcome|auth|extension|logo)/ig.test(path)) {
      $rootScope.header_show = 'no';
    } else {
      $rootScope.header_show = false;
    }
  })
  platform.name=='chrome'&&$('.boxscroll').niceScroll();
})
