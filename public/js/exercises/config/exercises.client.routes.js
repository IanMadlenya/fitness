angular.module('exercises').config(function exerciseRoutes($routeProvider) {
	$routeProvider.
		when('/exercises', {
			templateUrl: 'js/exercises/views/list-exercises.client.view.html',
			controller: 'ListExercisesCtrl as vm',
			resolve: {
				allExercises: function(ExercisesApi) {
					return ExercisesApi.query().$promise;
				}
			}
		}).
		when('/exercises/create', {
			templateUrl: 'js/exercises/views/create-exercise.client.view.html',
			controller: 'CreateUpdateExerciseCtrl as vm'
		}).
		when('/exercises/:exerciseId', {
			templateUrl: 'js/exercises/views/review-exercise.client.view.html',
			controller: 'ReviewExerciseCtrl as vm',
			resolve: {
				reviewExerciseData: function($route, ExercisesApi) {
					return ExercisesApi.get({
						exerciseId: $route.current.params.exerciseId
					}).$promise;
				}
			}
		}).
		when('/exercises/:exerciseId/edit', {
			templateUrl: 'js/exercises/views/edit-exercise.client.view.html',
			controller: 'CreateUpdateExerciseCtrl as vm'
		}).
		when('/exercises/:exerciseId/resume', {
			templateUrl: 'js/exercises/views/resume-exercise.client.view.html',
			controller: 'CreateUpdateExerciseCtrl as vm'
		}).
		when('/individual-exercise/:exerciseSlug', {
			templateUrl: 'js/exercises/views/individual-exercise.client.view.html',
			controller: 'IndividualExerciseCtrl as vm',
			resolve: {
				individualExerciseData: function($route, ExercisesApi) {
					return ExercisesApi.getExercisesBySlug({
						exerciseSlug: $route.current.params.exerciseSlug
					});
				}
			}
		});
	}
); 