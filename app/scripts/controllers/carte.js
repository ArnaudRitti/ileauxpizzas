'use strict';

/**
 * @ngdoc function
 * @name ileauxpizzasApp.controller:CarteCtrl
 * @description
 * # CarteCtrl
 * Controller of the ileauxpizzasApp
 */
angular.module('ileauxpizzasApp')
  .controller('CarteCtrl', function ($scope,$http) {
    $http.get("datas/carte.js")
    .then(function(response) {
        $scope.carte = response.data;
    });

    $scope.list = function(key) {
      $scope.models = {};
      $scope.liste = $scope.carte[key].plats;
    };

    $scope.getitemid = function(item) {
      return btoa(item.name + item.price.size);
    };

    $scope.allownull = function(p){
      console.log(p)
        if (p === null){
            return true;
        } else{
            return;
        }
    };


  });
