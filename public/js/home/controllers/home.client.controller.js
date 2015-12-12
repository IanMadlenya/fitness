angular.module('home').controller('HomeController', function homeController(Authentication) {
		var vm = this;
		vm.authentication = Authentication;
	}
);