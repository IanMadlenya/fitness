angular.module('journal').controller('JournalController', 
    function journalController($routeParams, $location, Authentication, Journals) {
        var vm = this;

        vm.authentication = Authentication;

        // Create 
        vm.createExercise = function createExercise() {
            var journal = new Journals({
                exercise: vm.exercise,
                exercise_slug: vm.exercise.replace(/\s+/g, '-').toLowerCase(),
                sets: vm.sets,
                reps: vm.reps,
                weight: vm.weight
            });

            journal.$save(function(response) {
                $location.path('journals/' + response._id);
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

        vm.deleteExercise = function deleteExercise(journal) {
            if (journal) {
                journal.$remove(function() {
                    for (var i in vm.journals) {
                        if (vm.journals[i] === journal) {
                            vm.journals.splice(i, 1);
                        }
                    }
                });
            } else {
                vm.journal.$remove(function() {
                    $location.path('journals');
                });
            }
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