angular.module('exercises').controller('ListExercisesCtrl', function listExercisesCtrl(allExercises) {
	var vm = this;
	vm.exerciseData = allExercises;
});