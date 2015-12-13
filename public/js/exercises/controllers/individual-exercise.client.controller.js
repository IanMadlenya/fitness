angular.module('exercises').controller('IndividualExerciseCtrl', function individualExerciseCtrl(individualExerciseData) {
	var vm = this;
	console.log(individualExerciseData);
	vm.exerciseData = individualExerciseData;
});