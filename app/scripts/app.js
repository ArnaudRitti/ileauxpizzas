'use strict';

/**
 * @ngdoc overview
 * @name ileauxpizzasApp
 * @description
 * # ileauxpizzasApp
 *
 * Main module of the application.
 */
angular
  .module('ileauxpizzasApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngCart',
    'oitozero.ngSweetAlert'
  ])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/menu', {
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl',
        controllerAs: 'menu'
      })
      .when('/carte/:key?', {
        templateUrl: 'views/carte.html',
        controller: 'CarteCtrl',
        controllerAs: 'carte'
      })
      .when('/404', {
        templateUrl: '404.html',
      })
      .when('/commander', {
        templateUrl: 'views/commander.html',
        controller: 'CommanderCtrl',
        controllerAs: 'commander'
      })
    	.otherwise({
    		redirectTo: '/'
    	});

      $locationProvider.html5Mode(true);

  });
