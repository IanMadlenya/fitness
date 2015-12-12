angular.module('journal').controller('IndividualExerciseCtrl', function individualExerciseCtrl(individualExerciseData) {
	var vm = this;
	vm.journals = individualExerciseData;
});