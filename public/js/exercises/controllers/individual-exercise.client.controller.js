angular.module('exercises').controller('IndividualExerciseCtrl', function individualExerciseCtrl(individualExerciseData) {
	var vm = this;
	vm.journals = individualExerciseData;
});