app.controller('cardCtrl', function($scope, $rootScope) {
  $($rootScope.data.user.form).insertAfter('#ng_viev').css('display', 'none').attr('target', '_blank');
  platform.name=='chrome'&&$('.content_card .cover_wrapper').niceScroll('.cover');
});
