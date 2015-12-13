angular.module('exercises').factory('ExercisesApi', function exercisesApi($resource) {
	
	var API_PATH = 'api/exercises/:exerciseId',

	defaultParams = {
		exerciseId: '@_id'
	},
	
	actions = {
		update: {
			method: 'PUT'
		}
	};

    return $resource(API_PATH, defaultParams, actions);
});