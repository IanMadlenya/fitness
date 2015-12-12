angular.module('users').factory('Authentication', function authenticationService() {
	this.user = window.user;
		return {
			user: this.user
		};
	}
);