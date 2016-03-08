angular.module('communication').controller('SendToFriendController', function sendToFriendController(MessageApi, exerciseData, localStorageService) {
	var vm = this,
		RECENT_CONTACT_KEY = 'meanfitRecentContacts';

	vm.successfulMessageRecipient = false;
	vm.messageData = {};

	vm.messageData.messageContent = 'Hey, I just did ' + exerciseData.exercise + '.  ' + exerciseData.reps + ' reps at ' + exerciseData.weight + ' pounds...';

	vm.recentContacts = getRecentContactList();

	vm.sendMessage = function sendMessage(messageData) {
		updateRecentContactList(messageData.recipient);

		MessageApi.sendMessage({}, messageData, function(res) {
			vm.successfulMessageRecipient = res.accepted[0]; //TODO - refine json passed back so this is more semantic
		}, function(error) {
			console.log(error);
		});
	};

	vm.bindRecentContact = function bindRecentContact(name) {
		vm.messageData.recipient = name;
	};

	function updateRecentContactList(recipient) {
		var shortenedContactList = [];

		if(!vm.recentContacts) {
			vm.recentContacts = [];
		}

		if(vm.recentContacts.indexOf(recipient) === -1) {
			vm.recentContacts.unshift(recipient);
			localStorageService.set(RECENT_CONTACT_KEY, shortenedContactList);
		}
	}

	function getRecentContactList() {
		var contactList = localStorageService.get(RECENT_CONTACT_KEY),
			shortenedContactList = [];

		if(!contactList) {
			return null;
		}

		if(contactList.length > 3) {
			shortenedContactList = contactList.splice(0, 3);
			return shortenedContactList;
		}

		return contactList;
	}
});
