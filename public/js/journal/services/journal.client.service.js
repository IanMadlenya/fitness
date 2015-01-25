// Create the 'journals' service
angular.module('journal').factory('Journals', ['$resource', function($resource) {
	// Use the '$resource' service to return an journal '$resource' object
    return $resource('api/journals/:journalId', {
        journalId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);