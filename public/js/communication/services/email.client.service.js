angular.module('communication').factory('EmailApi', function emailApi($resource) {
	
	var API_PATH = 'api/email',

	defaultParams = {},
	
	actions = {
		sendEmail: {
			method: 'POST',
			url: API_PATH + '/send-email'
		}
	};

    return $resource(API_PATH, defaultParams, actions);
});