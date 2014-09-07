var app = angular.module("pomodo", [
                      'ngRoute',
                      'ngAnimate',
                      'pomodo.controllers',
                      'pomodo.directives',
                      'pomodo.filters',
                      'pomodo.services'
                      ]);



app.config(function ($routeProvider, $locationProvider) {
	$routeProvider.when("/index", {
		templateUrl: 'res/templates/controllers/welcome.html',
    controller: 'ControllerWelcome'
	});
  $routeProvider.otherwise({
    redirectTo: '/index'
  });
});
