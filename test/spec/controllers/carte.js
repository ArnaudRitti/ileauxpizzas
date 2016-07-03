'use strict';

describe('Controller: CarteCtrl', function () {

  // load the controller's module
  beforeEach(module('ileauxpizzasApp'));

  var CarteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CarteCtrl = $controller('CarteCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CarteCtrl.awesomeThings.length).toBe(3);
  });
});
