angular.module('communication').factory('MessageApi', function messageApi($resource) {
	
	var API_PATH = 'api/email',

	defaultParams = {},
	
	actions = {
		sendMessage: {
			method: 'POST',
			url: API_PATH + '/send-email'
		}
	};

    return $resource(API_PATH, defaultParams, actions);
});