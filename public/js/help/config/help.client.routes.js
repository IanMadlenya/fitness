// Configure the 'help' module routes
angular.module('help').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/help', {
			templateUrl: 'js/help/views/help.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);