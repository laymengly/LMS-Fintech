angular.module('starter.services', ['ngResource'])

    .factory('Employees', function ($resource) {
        return $resource('/employees/:employeeId/:data');
    })
	.factory('Users', function ($resource) {
        return $resource('/user');
    });