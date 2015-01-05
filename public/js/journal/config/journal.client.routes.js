angular.module('journal').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            
            templateUrl: 'js/journal/views/journal.client.view.html'
        
        }).otherwise({
            redirectTo: '/'
        });
    }
]);