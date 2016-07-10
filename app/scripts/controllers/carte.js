'use strict';

/**
 * @ngdoc function
 * @name ileauxpizzasApp.controller:CarteCtrl
 * @description
 * # CarteCtrl
 * Controller of the ileauxpizzasApp
 */
angular.module('ileauxpizzasApp')
  .controller('CarteCtrl', function ($scope,$http, $routeParams,$rootScope) {

    $scope.list = function(key) {
      if ($scope.selected != key) {
        $rootScope.menukey = $scope.selected = key;
        $scope.models = {};
        $scope.liste = $scope.carte[key].plats;
      }
    };

    $http.get("datas/carte.js")
    .then(function(response) {
        $scope.carte = response.data;
        if ($routeParams.key) {
          $rootScope.menukey = $routeParams.key;
          $scope.list($rootScope.menukey);
        }else{
          $scope.selected = null;
        }
    });



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

    $scope.showhelp = function() {
      $rootScope.menukey = $scope.selected = null;
      $scope.models = {};
      $scope.liste = null;
    };


  });
