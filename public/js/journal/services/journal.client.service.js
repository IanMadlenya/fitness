angular.module('journal').factory('Journals', ['$resource', function($resource) {
    return $resource('api/journals/:journalId', {
        journalId: '@_id'
    }, {
        update: {
            method: 'PUT'
        }
    });
}]);