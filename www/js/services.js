angular.module('starter.services', ['ngResource'])

    .factory('Employees', function ($resource) {
        return $resource('/employees/:employeeId/:data');
    })
	.factory('Users', function ($resource) {
        return $resource('/users/:user_no');
    })

    .factory('Login', function ($resource) {
        return $resource('/login/:user_no');
    });