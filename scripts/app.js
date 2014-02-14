'use strict';

angular.module('flexeWebApp', ['ngRoute'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/job', {
        templateUrl: 'views/job.html',
        controller: 'JobCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
          redirectTo: '/home'
      });
  })
  .config( function($provide) {
    $provide.decorator('$log', ['$delegate', function($delegate) {
      // $delegate.debug = function(message) { };
      return $delegate;
    }]);
  })
  .run( function($rootScope, $location, User) {
    // register listener to watch route changes
    $rootScope.$on( '$routeChangeStart', function(event, next, current) {
      if ( User.isLoggedIn() === false ) {
        // not a logged user, we should be going to #login
        if ( next.templateUrl === 'views/login.html' ) {
          // already going to #login, no redirect needed
        } else {
          // not going to #login, we should redirect now
          $location.path( '/login' );
        }
      }
    })
  })
  .run( function(FlexeWebBackend) {
      // SeawebBackend.setLocation('http://198.199.97.60');
      FlexeWebBackend.setLocation('http://127.0.0.1:8001');
  });
