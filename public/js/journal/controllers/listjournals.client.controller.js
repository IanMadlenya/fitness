angular.module('journal').controller('ListJournalsCtrl', function listJournalsCtrl(allJournals) {
	var vm = this;
	vm.journals = allJournals;
});