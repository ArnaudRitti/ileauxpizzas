'use strict';

/**
 * @ngdoc function
 * @name ileauxpizzasApp.controller:CommanderCtrl
 * @description
 * # CommanderCtrl
 * Controller of the ileauxpizzasApp
 */
angular.module('ileauxpizzasApp')
  .controller('CommanderCtrl', function ($scope,$rootScope, $location, $http, ngCart, SweetAlert) {
    $scope.formData = {};

    $scope.steps = [
      'Step 1: Team Info',
      'Step 2: Campaign Info'
    ];
    $scope.selection = $scope.steps[0];

    $scope.backmenu = function(key){
      $location.path( '/carte/'+key );
    };

      $scope.getCurrentStepIndex = function(){
        // Get the index of the current step given selection
        return _.indexOf($scope.steps, $scope.selection);
      };

      // Go to a defined step index
      $scope.goToStep = function(index) {
        if ( !_.isUndefined($scope.steps[index]) )
        {
          $scope.selection = $scope.steps[index];
        }
      };

      $scope.hasNextStep = function(){
        var stepIndex = $scope.getCurrentStepIndex();
        var nextStep = stepIndex + 1;
        // Return true if there is a next step, false if not
        return !_.isUndefined($scope.steps[nextStep]);
      };

      $scope.hasPreviousStep = function(){
        var stepIndex = $scope.getCurrentStepIndex();
        var previousStep = stepIndex - 1;
        // Return true if there is a next step, false if not
        return !_.isUndefined($scope.steps[previousStep]);
      };

      $scope.incrementStep = function() {
        if ( $scope.hasNextStep() )
        {
          var stepIndex = $scope.getCurrentStepIndex();
          var nextStep = stepIndex + 1;
          $scope.selection = $scope.steps[nextStep];
        }
      };

      $scope.decrementStep = function() {
        if ( $scope.hasPreviousStep() )
        {
          var stepIndex = $scope.getCurrentStepIndex();
          var previousStep = stepIndex - 1;
          $scope.selection = $scope.steps[previousStep];
        }
      };

      $scope.send = function() {
          $scope.formData.cart = ngCart.toObject();
          $http({
                method: 'POST',
                url: 'mail.php',
                data: $.param($scope.formData),  // pass in data as strings
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
            })
                .success(function (data) {
                    if (!data.success) {
                      SweetAlert.swal("Erreur !", "Une erreur c'est produite", "error");
                    }
                    else {
                      SweetAlert.swal("Merci !", "Votre commande a bien ete prise en compte", "success");
                      ngCart.empty();
                    }
                });

      };
  });
