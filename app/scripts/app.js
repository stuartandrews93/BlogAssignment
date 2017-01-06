'use strict';

/**
 * @ngdoc overview
 * @name yapp
 * @description
 * # yapp
 *
 * Main module of the application.
 */

var config = {
  apiKey: "AIzaSyDu8n8xmF8auQ7yWiA24ra0TKhQ2fFMGII",
  authDomain: "blogassignmentdatabase.firebaseapp.com",
  databaseURL: "https://blogassignmentdatabase.firebaseio.com",
  storageBucket: "blogassignmentdatabase.appspot.com",
  messagingSenderId: "820815584116"
};
firebase.initializeApp(config);

angular
  .module('yapp', [
    'ui.router',
    'ngAnimate'
  ])
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when('/dashboard', '/dashboard/overview');
    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('base', {
        abstract: true,
        url: '',
        templateUrl: 'views/base.html'
      })
        .state('login', {
          url: '/login',
          parent: 'base',
          templateUrl: 'views/login.ng.html',
          controller: 'LoginCtrl'
        })
	      .state('signup', {
          url: '/signup',
          templateUrl: 'views/signup.ng.html',
          controller: 'LoginCtrl'
        })
        .state('dashboard', {
          url: '/dashboard',
          parent: 'base',
          templateUrl: 'views/dashboard.ng.html',
          controller: 'DashboardCtrl'
        })
          .state('overview', {
            url: '/overview',
            parent: 'dashboard',
            templateUrl: 'views/dashboard1/overview.ng.html'
          })
          .state('newentry', {
            url: '/newentry',
            parent: 'dashboard',
            templateUrl: 'views/dashboard1/newentry.ng.html',
            controller: 'NewEntryCtrl'
          })
	        .state('entries', {
            url: '/entries',
            parent: 'dashboard',
            templateUrl: 'views/dashboard1/entries.ng.html',
            controller: 'EntriesCtrl'
        });

  });
