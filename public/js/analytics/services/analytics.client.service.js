angular.module('analytics').factory('AnalyticsApi', function analyticsApi($resource) {
	
	var API_PATH = '/api/analytics',

	defaultParams = {},
	
	actions = {
		update: {
			method: 'PUT'
		}
	};

    return $resource(API_PATH, defaultParams, actions);
});