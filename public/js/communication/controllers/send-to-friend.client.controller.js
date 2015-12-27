angular.module('communication').controller('SendToFriendController', function sendToFriendController(MessageApi, exerciseData, localStorageService) {
	var vm = this,
		RECENT_CONTACT_KEY = 'meanfitRecentContacts';

	vm.sucessfulMessageRecipient = false;
	vm.messageData = {};

	vm.messageData.messageContent = 'Hey, I just did ' + exerciseData.exercise + '.  ' + exerciseData.reps + ' reps at ' + exerciseData.weight + ' pounds...';

	vm.recentContacts = getRecentContactList();

	vm.sendMessage = function sendMessage(messageData) {
		updateRecentContactList(messageData.recipient);

		MessageApi.sendMessage({}, messageData, function(res) {
			vm.sucessfulMessageRecipient = res.accepted[0]; //TODO - refine json passed back so this is more semantic
		}, function(error) {
			console.log(error);
		});
	};

	vm.bindRecentContact = function bindRecentContact(name) {
		vm.messageData.recipient = name;
	};

	function updateRecentContactList(recipient) {
		if(!vm.recentContacts) {
			vm.recentContacts = [];
		}

		vm.recentContacts.push(recipient);
		localStorageService.set(RECENT_CONTACT_KEY, vm.recentContacts);
	}

	function getRecentContactList() {
		var contactList = localStorageService.get(RECENT_CONTACT_KEY);
		var shortenedContactList = contactList.slice(Math.max(contactList.length - 3, 1)).reverse();

		console.log(shortenedContactList);

		return shortenedContactList;
	}
});