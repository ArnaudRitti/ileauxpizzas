'use strict';

/**
 * @ngdoc function
 * @name ileauxpizzasApp.controller:ContactCtrl
 * @description
 * # ContactCtrl
 * Controller of the ileauxpizzasApp
 */
angular.module('ileauxpizzasApp')
  .controller('ContactCtrl', function () {
    google.maps.event.addDomListener(window, 'load', init_map);
    init_map();
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
