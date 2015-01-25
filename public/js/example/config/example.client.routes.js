// Configure the 'example' module routes
angular.module('example').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'js/example/views/example.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);