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
    }, {
      'date': '22:57 13.03.2019',
      'fix': 'Improved liking functions!, and fixed some bugs. Some design changes'
    }
  ]
  $rootScope.fix.reverse()
});
