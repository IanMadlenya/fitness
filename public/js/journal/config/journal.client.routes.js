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
		}).
		when('/journals/:journalId/resume', {
			templateUrl: 'js/journal/views/resume-entry.client.view.html'
		}).
		when('/individual-exercise/:exercise_slug', {
			templateUrl: 'js/journal/views/individual-exercise.client.view.html'
		});
	}
]); 