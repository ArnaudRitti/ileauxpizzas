'use strict';

describe('Controller: CommanderCtrl', function () {

  // load the controller's module
  beforeEach(module('ileauxpizzasApp'));

  var CommanderCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CommanderCtrl = $controller('CommanderCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CommanderCtrl.awesomeThings.length).toBe(3);
  });
});
