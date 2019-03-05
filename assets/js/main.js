let storage = window.localStorage;
console.log(storage)
let payed = 0;
let pro_stor = storage.getItem('pro');
if (payed == 1) {
    pro_stor = "pro.html";
    storage.setItem('pro', 'pro.html')
} else {
    pro_stor = "index.html";
}

let app = angular.module("Routing", ["ngRoute", 'ngAnimate']);
//Routing
app.config(($routeProvider) => {
    $routeProvider.when("/", {
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
    }).when("/lessons", {
        templateUrl: "lessons.html",
    }).when("/extension", {
        templateUrl: "extension.html",
    }).when("/settings", {
        templateUrl: "settings.html",
    }).otherwise({redirectTo:'/'});
});
app.run(($rootScope) => {
    $rootScope.APPNAME = "Instafly";
    $rootScope.status1 = "sleeping";
    $rootScope.select_names = ["Like by hashtags", "Like my feed", "Like by locations", "Like user's followers", "Like user's followings"];
    $rootScope.tasks_count = 1;
     $rootScope.liked = 200;
 $rootScope.max_likes_per_day = 500;
     setInterval(() => 
        {
            $rootScope.$apply(()=>{
              $rootScope.liked++;
              $rootScope.liked1 = $rootScope.liked;
        })
            console.log($rootScope.liked)}
        , 1000);
    $rootScope.$on('$routeChangeStart', function(event, current, next, previous, reject) {})
})
app.controller('indexCtrl', function($scope, $rootScope) {});
app.controller('editCtrl', function($scope, $rootScope) {
    $scope.selected_option = $rootScope.select_names[0];
    let selected_option;
    $scope.selected = function(a) {
        $scope.selected_option = $rootScope.select_names[a]
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
app.controller('proCtrl', function($scope, $rootScope) {
    

});
app.controller('lessonsCtrl', function($scope, $rootScope) {});
app.controller('extCtrl', function($scope, $rootScope) {});
app.controller('settingsCtrl', function($scope, $rootScope) {});
app.controller('likedCtrl', function($scope, $rootScope) {
    let d = new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' ');
    $scope.d = d;
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
function goBack() {
  window.history.back();
}