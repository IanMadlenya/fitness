var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['ngResource', 'ngRoute', 'ui', 'ui.filters', 'users', 'home', 'help', 'journal']);


mainApplicationModule.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
]);

//fixes facebook OAuth redirect bug

if (window.location.hash === '#_=_') window.location.hash = '#!';


angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});
