angular.module('exercises').controller('CreateUpdateExerciseCtrl', 
    function exercisesController($routeParams, $location, Authentication, ExercisesApi) {
        var vm = this;

        if($routeParams.hasOwnProperty('exerciseId')) {
            ExercisesApi.get({
                exerciseId: $routeParams.exerciseId
            }).$promise.then(function(response) {
                vm.exerciseData = response;
            }, function(errorResponse) {
                vm.error = errorResponse.data.message;
            });
        } 

        vm.createExercise = function createExercise(exerciseData) {
            //The data passed in from the "resume" page will have a lot more
            //than what we need, so lets map the essentials and save it
            //to the server.
            var simplifiedExerciseData = exerciseDataMapper(exerciseData); 

            ExercisesApi.save(simplifiedExerciseData, function(response) {
                $location.path('exercises/' + response._id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.message;
            });
        };

        vm.updateExercise = function updateExercise(exerciseData) {
            var simplifiedExerciseData = exerciseDataMapper(exerciseData);
            
            ExercisesApi.update({exerciseId: exerciseData._id}, simplifiedExerciseData, function(response) {
                $location.path('exercises/' + response._id);
            }, function(errorResponse) {
                vm.error = errorResponse.data.message;
            });
        };

        //Add weight easily when resuming an exercise
        vm.incrementWeight = function incrementWeight(weight) {
            vm.exerciseData.weight = parseInt(vm.exerciseData.weight, 10) + weight;
            return vm.exerciseData.weight;
        };

        //Add sets easily when resuming/creating an exercise
        vm.incrementSets = function incrementSets() {
            vm.exerciseData.sets = parseInt(vm.exerciseData.sets, 10) + 1;
            return vm.exerciseData;
        };

        function exerciseDataMapper(exerciseData) {
            var data = {};

            data.exercise = exerciseData.exercise;
            data.exerciseSlug = exerciseData.exercise.replace(/\s+/g, '-').toLowerCase();
            data.reps = exerciseData.reps;
            data.sets = exerciseData.sets;
            data.weight = exerciseData.weight;

            return data;
        }
    }
);