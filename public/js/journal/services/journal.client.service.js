angular.module('journal').factory('Journals', function journalService($resource) {
	
	var API_PATH = 'api/journals/:journalId',

	defaultParams = {
		journalId: '@_id'
	},
	
	actions = {
		update: {
			method: 'PUT'
		}
	};

    return $resource(API_PATH, defaultParams, actions);
});