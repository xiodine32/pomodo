var app = angular.module("pomodo.directives", []);

app.directive('timer', function(ServiceTimer){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
	 	restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'res/templates/directives/timer.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			$scope.start = ServiceTimer.start;
			$scope.stop = ServiceTimer.stop;
			$scope.pause = ServiceTimer.pause;
			$scope.timerData = timerData;
		}
	};
});
