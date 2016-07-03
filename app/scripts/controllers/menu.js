'use strict';

/**
 * @ngdoc function
 * @name ileauxpizzasApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the ileauxpizzasApp
 */
angular.module('ileauxpizzasApp')
  .controller('MenuCtrl', function ($scope,$http) {
    $http.get("datas/menus.js")
    .then(function(response) {
        $scope.menus = response.data;
    });

  });
