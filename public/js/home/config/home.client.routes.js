angular.module('home').config(function homeRoutes($routeProvider) {
	$routeProvider.
		when('/', {
			templateUrl: 'js/home/views/home.client.view.html',
			controller: 'HomeController as vm'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
);