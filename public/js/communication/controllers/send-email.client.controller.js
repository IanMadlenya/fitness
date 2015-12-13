angular.module('communication').controller('SendEmailController', function sendEmailController(EmailApi) {
	var vm = this;
	vm.sucessfulEmailRecipient = false

	vm.sendEmail = function sendEmail(emailData) {
		EmailApi.sendEmail({}, emailData, function(res) {
			vm.sucessfulEmailRecipient = res.accepted[0]; //TODO - refine json passed back so this is more semantic
		}, function(error) {
			console.log(error);
		});
	};
});