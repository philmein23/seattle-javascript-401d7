var angular = require('angular');
require('angular-mocks');

describe('bears controller', function() {
  var $controller;

  beforeEach(angular.mock.module('demoApp'));

  beforeEach(angular.mock.inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  it('should be a controller', function() {
    var bearsctrl = $controller('BearsController');
    expect(typeof bearsctrl).toBe('object');
    expect(typeof bearsctrl.getAll).toBe('function');
  });

  describe('REST functionality', function() {
    var $httpBackend;
    var bearsctrl;
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
      bearsctrl = $controller('BearsController');
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
     
    it('should send a GET to retrieve bears', function() {
      $httpBackend.expectGET('http://localhost:3000/api/bears').respond(200, [{name: 'test bear'}]);
      bearsctrl.getAll();
      $httpBackend.flush();
      expect(bearsctrl.bears.length).toBe(1);
      expect(bearsctrl.bears[0].name).toBe('test bear');
    });

    it('should create a bear', function() {
      $httpBackend.expectPOST('http://localhost:3000/api/bears', {name: 'yogi'}).respond(200, {name: 'some bear'});
      expect(bearsctrl.bears.length).toBe(0);
      bearsctrl.newBear = {name: 'yogi'};
      bearsctrl.createBear();
      $httpBackend.flush();
      expect(bearsctrl.bears[0].name).toBe('some bear');
      expect(bearsctrl.newBear).toBe(null);
    });

    it('should upate a bear', function() {
      $httpBackend.expectPUT('http://localhost:3000/api/bears/1', {name: 'change bears!', editing: true, _id: 1}).respond(200);

      bearsctrl.bears = [{name: 'test bear', editing: true, _id: 1}];
      bearsctrl.bears[0].name = 'change bears!';
      bearsctrl.updateBear(bearsctrl.bears[0]);
      $httpBackend.flush();
      expect(bearsctrl.bears[0].editing).toBe(false);
    });

    it('should murder a bear', function() {
      $httpBackend.expectDELETE('http://localhost:3000/api/bears/1').respond(200);
      bearsctrl.bears = [{name: 'yogi', _id: 1}];
      bearsctrl.removeBear(bearsctrl.bears[0]);
      $httpBackend.flush();
      expect(bearsctrl.bears.length).toBe(0);
    });
  });
});
