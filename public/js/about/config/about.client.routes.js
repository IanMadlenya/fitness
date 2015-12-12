angular.module('about').config(function aboutRoutes($routeProvider) {
	$routeProvider.
		when('/about-mean-fit', {
			templateUrl: 'js/about/views/about.client.view.html'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
);