app.controller('homeCtrl', function($scope, $rootScope, $location) {
  $rootScope.less_preview = [0, 1];
  var path = $location.path();
  var h_wrapp = '.scrollbox';
  $(h_wrapp).niceScroll('.wrap');
  //   if ($scope.selected == undefined) {
  //     $scope.selected = 0;
  //   }
  //   $scope.select = function(index) {
  //     $scope.selected = index;
  //     $(h_wrapp).getNiceScroll(0).doScrollLeft($('.scroll_inset')[index].offsetLeft);
  //   };
  //   $(h_wrapp).scroll(function() {
  //     var scrolled_x = $('.wrap').css('transform').slice(20, -4);
  //     scrolled_x = Math.ceil(Number(scrolled_x));
  //     if (scrolled_x == 0) {
  //       scrolled_x = 0;
  //     }
  //     var pos_first = $('.scroll_inset')[0].offsetLeft
  //     pos_first = Math.ceil(Number(pos_first));
  //     $scope.$apply(()=>{
  //       $scope.scrolled = Math.ceil((scrolled_x - pos_first) / 360);
  //       if (path == '/lessons') {
  //         $scope.$watch('scrolled',()=>{
  //           if ($scope.scrolled == 2) {
  //           $rootScope.app.alerts.goProPopup = true;
  //           $scope.scrolled = 1;
  //           $('.lessons_title_scroll').getNiceScroll(0).doScrollLeft(0);
  //           }
  //         })
  //       }
  //     });
  // });
});
