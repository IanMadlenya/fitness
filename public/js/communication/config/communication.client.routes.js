angular.module('communication').config(function emailRoutes($routeProvider) {
	$routeProvider.
		when('/communication/send-email', {
			templateUrl: 'js/communication/views/send-email.client.view.html',
			controller: 'SendEmailController as vm'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
);