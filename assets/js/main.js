let storage = window.localStorage;
console.log(storage)
let app = angular.module("Routing", ["ngRoute", 'ngAnimate']);
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
app.run(($rootScope) => {

  $rootScope.window = window;
  $rootScope.document = document;
  window.data = $rootScope.data = {
    tasks: [],
    feed: [],
    status: 'Sleeping'
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
    api.sendMessage({
      why: "getData"
    }, function(response) {
      response.user.isMember = !1;
      if (!cb) {
        console.log(response)
        $rootScope.data = response;
        $rootScope.$apply();
        if (!$rootScope.data.user.username) {
          $rootScope.goTo('extension')
          return;
        }
        if (!$rootScope.data.tasks.length) {
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
    setTimeout(function() {
      $('body').niceScroll().resize();
    }, 200);
  }, true);

  $rootScope.get();
  setInterval(function() {
    $rootScope.get(function(e) {
      if ($rootScope.data.feed.length != e.feed.length || $rootScope.data.status != e.status || $rootScope.data.user.username != e.user.username) {
        $rootScope.data.feed = e.feed;
        $rootScope.data.status = e.status;
        $rootScope.data.user = e.user;
        $rootScope.$apply();
      }
    })
  }, 1000);


  $rootScope.saveTask = function() {
    if ($rootScope.newTask.textarea.length < 40) {
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
$rootScope.F = false;
    $rootScope.count_less = arguments[1].params.count_less;
    $rootScope.count_less = Number($rootScope.count_less);
    if ($rootScope.count_less != undefined) {
      $rootScope.count_less = String($rootScope.count_less).slice(1)
    }
  })
  $('body').niceScroll();
  $('.boxscroll_lessons').getNiceScroll().resize();
})
app.controller('indexCtrl', function($scope, $rootScope) {});
app.controller('editCtrl', function($scope, $rootScope) {
  $scope.selected_option = $rootScope.app.filters[0];
  let selected_option;
  $scope.ta_maxLength = 400;
  $scope.ta_minLength = 40;


  $scope.selected = function(a) {
    if (a == 1 || a == 3 || a == 4) {
      $scope.no = true;
        $scope.ta_maxLength = 0;
        $scope.ta_minLength = 0;
    }
    else {
      $scope.no = false;
        $scope.ta_maxLength = 400;
        $scope.ta_minLength = 40;
    }
    $scope.selected_option = $rootScope.app.filters[a]
  }
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
app.controller('cardCtrl', function($scope, $rootScope) {
  $($rootScope.data.user.form).insertAfter('#ng_viev').css('display', 'none').attr('target', '_blank');
  $('.content_card .cover_wrapper').niceScroll('.cover');
});
app.controller('homeCtrl', function($scope, $rootScope, $location) {
  $('.home_lessons_wrapper .boxscroll').niceScroll('.wrap');
  $rootScope.less_preview = [0, 1];
  $('.list_wrapper .boxscroll').niceScroll('.wrap');
  var path = $location.path();
  if (path == '/home') {
    if ($scope.selected == undefined) {
      $scope.selected = 0;
    }
    $scope.select = function(index) {
      $scope.selected = index;
      $('.home_lessons_wrapper .boxscroll').getNiceScroll(0).doScrollLeft($('.home_lessons')[index].offsetLeft);
    };
    $('.boxscroll').scroll(function() {
      var scrolled_x = $('.wrap').css('transform').slice(20, -4);
      scrolled_x = Math.ceil(Number(scrolled_x));
      if (scrolled_x == 0) {
        scrolled_x = 0;
      }
      var pos_first = $('.home_lessons')[0].offsetLeft
      pos_first = Math.ceil(Number(pos_first));
      $scope.scrolled = (scrolled_x - pos_first) / 360;
      $scope.$apply(() => {
        $scope.scrolled = Math.ceil($scope.scrolled)

      })
    })
  }
  if (path == '/lessons') {
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
app.controller('lessonsCtrl', function($scope, $rootScope) {});
app.controller('aboutCtrl', function($scope, $rootScope) {
  $('.about_wrapper .boxscroll').niceScroll('.wrap');
  $rootScope.F = true;
  $rootScope.fix = [{
      'date': '07:07 03.02.2019',
      'fix': 'Beta-testing We are improving lessons and practice scenes now.'
  }, {
      'date': '12:20  04.02.2019',
      'fix': 'Fixed some bugs with tips of a day, lessons and sounds settings.'
  }, {
      'date': '14:25 04.02.2019',
      'fix': '-Fixed redirect to lessons page, and if lesson is undefined then  "There is no lesson to this level yet!" -Improved in info page footer.'
  }, {
      'date': '20:10 05.02.2019',
      'fix': 'NEW gameplay! Impoved design!'
  }, {
      'date': '11:30 08.02.2019',
      'fix': 'Fixed some bugs...'
  }, {
      'date': '14:21 08.02.2019',
      'fix': 'Added functional for Campaign. Now showed word wrank - if you rank so small. And fixed some small bugs'
  }, {
      'date': '18:03 09.02.2019',
      'fix': 'Added in settings button "update". Tips of day now better'
  }, {
      'date': '12:16 17.02.2019',
      'fix': 'New Menu!'
  }
  , {
      'date': '12:27 21.02.2019',
      'fix': 'Improved Menu!, and fixed some bugs. Some design changes'
  }]
  $rootScope.fix.reverse()
});
app.controller('extCtrl', function($scope, $rootScope) {});
app.controller('settingsCtrl', function($scope, $rootScope) {
  $scope.dayily_limit = 500;
  $scope.dayily_limit_max = 5000;
  $scope.$watch('dayily_limit', () => {
  })
});
app.controller('likedCtrl', function($scope, $rootScope) {
  setInterval(function() {
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
app.controller('authCtrl', function($scope, $rootScope) {
  $scope.$watch('eye_pass', () => {
    if ($scope.eye_pass == true) {
      $scope.pass = "text"
    } else {
      $scope.pass = "password"
    }
  })
});
