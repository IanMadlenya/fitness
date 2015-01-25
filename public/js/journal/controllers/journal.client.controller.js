angular.module('journal').controller('JournalController', ['$scope', 'Authentication',
    function($scope, Authentication) {
        $scope.name = Authentication.user ? Authentication.user.fullName : 'MEAN Fit';
   }
]);