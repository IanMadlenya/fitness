angular.module('journal').controller('ReviewExerciseCtrl', function reviewExerciseCtrl(reviewExerciseData) {
	var vm = this;
	vm.journal = reviewExerciseData;
});