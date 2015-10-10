angular.module('home').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/', {
			templateUrl: 'js/home/views/home.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);