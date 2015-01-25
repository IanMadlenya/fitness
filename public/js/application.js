var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngRoute', 'users', 'journal']);


//fixes facebook OAuth redirect bug, which adds a hash to the app's URL
if (window.location.hash === '#_ =_') window.location.hash = '#!';


angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});

mainApplicationModule.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);