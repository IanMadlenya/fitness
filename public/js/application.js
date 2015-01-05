var mainApplicationModuleName = 'mean';

var mainApplicationModule = angular.module(mainApplicationModuleName, ['journal']);

angular.element(document).ready(function() {
    angular.bootstrap(document, [mainApplicationModuleName]);
});