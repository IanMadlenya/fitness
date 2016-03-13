angular.module('exercises').factory('ExercisesApi', function exercisesApi($resource) {
	
	var API_PATH = 'api/exercises/:exerciseId',

	defaultParams = {
		exerciseId: '@_id'
	},
	
	actions = {
		update: {
			method: 'PUT'
		},
		getExercisesBySlug: {
			url: 'api/exercises/listBySlug/:exerciseSlug',
			method: 'GET',
			isArray: true
		}
	};

    return $resource(API_PATH, defaultParams, actions);
});