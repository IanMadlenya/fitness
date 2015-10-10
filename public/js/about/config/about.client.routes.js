angular.module('about').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/about-mean-fit', {
			templateUrl: 'js/about/views/about.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);