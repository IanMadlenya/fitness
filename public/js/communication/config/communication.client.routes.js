angular.module('communication').config(function communicationRoutes($routeProvider) {
	$routeProvider.
		when('/communication/send/:exerciseId', {
			templateUrl: 'js/communication/views/send-to-friend.client.view.html',
			controller: 'SendToFriendController as vm',
			resolve: {
				exerciseData: function($route, ExercisesApi) {
					return ExercisesApi.get({
						exerciseId: $route.current.params.exerciseId
					}).$promise;
				}
			}
		}).
		otherwise({
			redirectTo: '/'
		});
	}
);