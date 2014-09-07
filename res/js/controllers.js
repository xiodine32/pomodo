var app = angular.module("pomodo.controllers", []);


app.controller('ControllerWelcome', function($scope){
	$scope.ticks=ticks;
	$scope.timerData = timerData;
});
