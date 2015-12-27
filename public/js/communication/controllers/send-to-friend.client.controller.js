angular.module('communication').controller('SendToFriendController', function sendToFriendController(MessageApi, exerciseData) {
	var vm = this;
	vm.sucessfulMessageRecipient = false;
	vm.messageData = {};

	vm.messageData.messageContent = 'Hey, I just did ' + exerciseData.exercise + '.  ' + exerciseData.reps + ' reps at ' + exerciseData.weight + ' pounds...';

	vm.sendMessage = function sendMessage(messageData) {
		MessageApi.sendMessage({}, messageData, function(res) {
			vm.sucessfulMessageRecipient = res.accepted[0]; //TODO - refine json passed back so this is more semantic
		}, function(error) {
			console.log(error);
		});
	};
});
