angular.module('exercises').controller('CreateUpdateExerciseCtrl', 
    function exercisesController($routeParams, $location, Authentication, ExercisesApi) {
        var vm = this;

        vm.authentication = Authentication;

        vm.createExercise = function createExercise() {
            var exercise = new ExercisesApi({
                exercise: vm.exercise,
                exercise_slug: vm.exercise.replace(/\s+/g, '-').toLowerCase(),
                sets: vm.sets,
                reps: vm.reps,
                weight: vm.weight
            });

            exercise.$save(function(response) {
                $location.path('exercises/' + response._id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.message;
            });
        };

        vm.updateJournal = function updateJournal() {
            vm.journal.$update(function() {
                $location.path('journals/' + vm.journal._id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.message;
            });
        };

        //Add weight easily when resuming an exercise
        vm.incrementWeight = function incrementWeight(weight) {
            vm.journal.weight = parseInt(vm.journal.weight, 10) + weight;
            return vm.journal.weight;
        };

        //Add sets easily when resuming/creating an exercise
        vm.incrementSets = function incrementSets() {
            vm.journal.sets = parseInt(vm.journal.sets, 10) + 1;
            return vm.journal.sets;
        };
    }
);