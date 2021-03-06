var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, 
	['ngResource', 
	'ngRoute', 
	'ui', 
	'ui.filters',
	'LocalStorageModule', 
	'users', 
	'home', 
	'about', 
	'exercises',
	'communication',
	'analytics']);


mainApplicationModule.config(function appConfig($locationProvider) {
        $locationProvider.hashPrefix('!');
    }
);

//fixes facebook OAuth redirect bug

if (window.location.hash === '#_=_') window.location.hash = '#!';

//fix redirect bug to /# that happens on some browsers

if (window.location.href.slice(-1) === '#') window.location.hash = "#!";