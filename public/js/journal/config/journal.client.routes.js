angular.module('journal').config(function journalRoutes($routeProvider) {
	$routeProvider.
		when('/journals', {
			templateUrl: 'js/journal/views/list-entries.client.view.html',
			controller: 'ListJournalsCtrl as vm',
			resolve: {
				allJournals: function(Journals) {
					return Journals.query().$promise;
				}
			}
		}).
		when('/journals/create', {
			templateUrl: 'js/journal/views/create-entry.client.view.html',
			controller: 'JournalController as vm'
		}).
		when('/journals/:journalId', {
			templateUrl: 'js/journal/views/view-entry.client.view.html',
			controller: 'ReviewExerciseCtrl as vm',
			resolve: {
				reviewExerciseData: function($route, Journals) {
					return Journals.get({
            			journalId: $route.current.params.journalId
            		}).$promise;
				}
			}
		}).
		when('/journals/:journalId/edit', {
			templateUrl: 'js/journal/views/edit-entry.client.view.html',
			controller: 'JournalController as vm'
		}).
		when('/journals/:journalId/resume', {
			templateUrl: 'js/journal/views/resume-entry.client.view.html',
			controller: 'JournalController as vm'
		}).
		when('/individual-exercise/:exercise_slug', {
			templateUrl: 'js/journal/views/individual-exercise.client.view.html',
			controller: 'IndividualExerciseCtrl as vm',
			resolve: {
				individualExerciseData: function($route, Journals) {
					return Journals.query({
                		exercise_slug: $route.current.params.exercise_slug
           			});
				}
			}
		});
	}
); 