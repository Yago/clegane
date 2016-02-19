'use strict';

/* global app */

app.config(function($stateProvider, $urlRouterProvider, $rootScopeProvider) {

  $stateProvider
    .state('app', {
      url: '',
      abstract: true,
      templateUrl: 'templates/menu.html'
    })
    .state('app.homepage', {
      url: '/',
      requireAuth: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/homepage.html'
        }
      }
    })
    .state('app.login', {
      url: '/login',
      requireAuth: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html'
        }
      }
    })
    .state('app.signup', {
      url: '/signup',
      requireAuth: false,
      views: {
        'menuContent': {
          templateUrl: 'templates/signup.html'
        }
      }
    })
    .state('app.dashboard', {
      url: '/dashboard',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/dashboard.html'
        }
      }
    })
    .state('app.movie', {
      url: '/movie/:id',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/movie.html'
        }
      }
    })
    .state('app.movies', {
      url: '/movies/:query/:page',
      requireAuth: true,
      params : { type: 'movies' },
      views: {
        'menuContent': {
          templateUrl: 'templates/discover.html'
        }
      }
    })
    .state('app.tv', {
      url: '/tv/:id',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/tv.html'
        }
      }
    })
    .state('app.season', {
      url: '/tv/:id/season/:season_number',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/season.html'
        }
      }
    })
    .state('app.episode', {
      url: '/tv/:id/season/:season_number/episode/:episode_number',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/episode.html'
        }
      }
    })
    .state('app.tvs', {
      url: '/tvs/:query/:page',
      requireAuth: true,
      params : { type: 'tvs' },
      views: {
        'menuContent': {
          templateUrl: 'templates/discover.html'
        }
      }
    })
    .state('app.people', {
      url: '/people/:id',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/people.html'
        }
      }
    })
    .state('app.peoples', {
      url: '/peoples/:query/:page',
      requireAuth: true,
      params : { type: 'peoples' },
      views: {
        'menuContent': {
          templateUrl: 'templates/discover.html'
        }
      }
    })
    .state('app.search', {
      url: '/search/:query/:page',
      requireAuth: true,
      params : { type: 'search' },
      views: {
        'menuContent': {
          templateUrl: 'templates/results.html'
        }
      }
    })
    .state('app.tag', {
      url: '/tag/:query/:page',
      requireAuth: true,
      params : { type: 'tag' },
      views: {
        'menuContent': {
          templateUrl: 'templates/results.html'
        }
      }
    })
    .state('app.genre', {
      url: '/genre/:query/:page',
      requireAuth: true,
      params : { type: 'genre' },
      views: {
        'menuContent': {
          templateUrl: 'templates/results.html'
        }
      }
    })
    .state('app.watched', {
      url: '/watched',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/watched.html'
        }
      }
    })
    .state('app.list', {
      url: '/list/:id',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/list.html'
        }
      }
    })
    .state('app.lists', {
      url: '/lists',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/lists.html'
        }
      }
    })
    .state('app.settings', {
      url: '/settings',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/settings.html'
        }
      }
    })
    .state('app.about', {
      url: '/about',
      requireAuth: true,
      views: {
        'menuContent': {
          templateUrl: 'templates/about.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/');

});
