// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'/*, 'starter.auth'*/])

.run(function($window, $location, $rootScope, $state, $ionicPlatform, $http) {
  var user = JSON.parse($window.localStorage.getItem('user'));
  
  $rootScope.user = user;
  $rootScope.server = {url: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '')};

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

// Re-route to welcome street if we don't have an authenticated token
  $rootScope.$on('$stateChangeStart', function(event, toState) {
      if (toState.name !== 'noMenu.user_login' && toState.name !== 'noMenu.user_signup' && toState.name !== 'app.welcome' && toState.name !== 'app.logout' && !$window.localStorage.getItem('user')) {
          console.log('Aborting state ' + toState.name + ': No token');
          //$location.path('/noMenu/user_login');
          $state.go('noMenu.user_login');
          event.preventDefault();
      }
  });

  $state.go('app.home');

})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('noMenu', {
        "url" : "/noMenu",
        abstract : true,
        templateUrl : "templates/noMenuState.html"
      })
  
    .state("noMenu.user_login", {
      "url" : "/user_login",
      views : {
        "noMenuView" : {
          templateUrl : "templates/user_login.html",
          controller: "LoginCtrl"
        }
      }
    })
    .state("noMenu.user_signup", {
      "url" : "/user_signup",
      views : {
        "noMenuView" : {
          templateUrl : "templates/signup.html",
          controller: "LoginCtrl"
        }
      }
    })
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'LoginCtrl'
  })

  .state('app.leave_request', {
    url: '/leave_request',
    views: {
      'menuContent': {
        templateUrl: 'templates/leave_request.html'
      }
    }
  })
  .state('app.ot_request',{
    url:'/ot_request',
    views:{
      'menuContent':{
        templateUrl:'templates/ot_request.html',
        controller:'OTRequest'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller:'HomeCtrl' 
      }
    }
  })
 .state('app.leave_report', {
    url: '/leave_report',
    views: {
      'menuContent': {
        templateUrl: 'templates/leave_report.html'
      }
    }
  })
 .state('app.ot_report', {
    url: '/ot_report',
    views: {
      'menuContent': {
        templateUrl: 'templates/ot_report.html',
        controller:'OTReportCtrl'
      }
    }
  })
   .state('app.user_infor', {
      url: '/user_info',
      views: {
        'menuContent': {
          templateUrl: 'templates/user_info.html'
        }
      }
    })
   .state('app.user_login', {
      url: '/user_login',
      views: {
        'menuContent': {
          templateUrl: 'templates/user_login.html'
        }
      }
    })
   .state('app.user_signup', {
      url: '/user_signup',
      views: {
        'menuContent': {
          templateUrl: 'templates/user_signup.html'
        }
      }
    })
  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  //$urlRouterProvider.otherwise('/app/playlists');
  //$urlRouterProvider.otherwise('/noMenu/user_login');
});
