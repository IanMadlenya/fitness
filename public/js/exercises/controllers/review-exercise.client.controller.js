angular.module('exercises').controller('ReviewExerciseCtrl', function reviewExerciseCtrl(reviewExerciseData, ExercisesApi) {
	var vm = this;
	vm.exerciseData = reviewExerciseData;
});