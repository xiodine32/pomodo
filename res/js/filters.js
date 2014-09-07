var app = angular.module("pomodo.filters", []);

app.filter('counter', function() {
	return function(input, data, add) {
		if (add)
			data++;
		for (i = 1; i <= data; i++)
			input.push(i);
		return input;
	}
});
