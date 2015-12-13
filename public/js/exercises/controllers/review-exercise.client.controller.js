angular.module('exercises').controller('ReviewExerciseCtrl', function reviewExerciseCtrl($location, reviewExerciseData, ExercisesApi) {
	var vm = this;
	vm.exerciseData = reviewExerciseData;

    vm.deleteExercise = function deleteExercise() {
        vm.exerciseData.$remove(function() {
            $location.path('exercises');
        });
    };
});