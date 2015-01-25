// Configure the 'journals' module routes
angular.module('journal').config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/journals', {
			templateUrl: 'js/journal/views/list-entries.client.view.html'
		}).
		when('/journals/create', {
			templateUrl: 'js/journal/views/create-entry.client.view.html'
		}).
		when('/journals/:journalId', {
			templateUrl: 'js/journal/views/view-entry.client.view.html'
		}).
		when('/journals/:journalId/edit', {
			templateUrl: 'js/journal/views/edit-entry.client.view.html'
		});
	}
]); 