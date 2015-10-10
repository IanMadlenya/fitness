angular.module('journal').controller('JournalController', ['$scope', '$routeParams', '$location', 'Authentication', 'Journals',
    function($scope, $routeParams, $location, Authentication, Journals) {
        // Expose the Authentication service
        $scope.authentication = Authentication;

        $scope.contentLoaded = false;

        // Create 
        $scope.create = function() {
            var journal = new Journals({
                exercise: this.exercise,
                exercise_slug: this.exercise.replace(/\s+/g, '-').toLowerCase(),
                sets: this.sets,
                reps: this.reps,
                weight: this.weight
            });

            journal.$save(function(response) {
                $location.path('journals/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Resume - same as above but takes the values that have been bound from findOne()
        // TODO - there has to be a better way to do this methinks
        $scope.resume = function() {
            var journal = new Journals({
                exercise: this.journal.exercise,
                exercise_slug: this.journal.exercise.replace(/\s+/g, '-').toLowerCase(),
                sets: this.journal.sets,
                reps: this.journal.reps,
                weight: this.journal.weight
            });

            journal.$save(function(response) {
                $location.path('journals/' + response._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.find = function() {
            $scope.journals = Journals.query();
            $scope.contentLoaded = true;
        };

        $scope.findOne = function() {
            $scope.journal = Journals.get({
                journalId: $routeParams.journalId
            });
        };

        $scope.findExercisesByName = function() {
            $scope.journals = Journals.query({
                exercise_slug: $routeParams.exercise_slug
            });
        };

        $scope.update = function() {
            $scope.journal.$update(function() {
                $location.path('journals/' + $scope.journal._id);
            }, function(errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        $scope.delete = function(journal) {
            if (journal) {
                journal.$remove(function() {
                    for (var i in $scope.journals) {
                        if ($scope.journals[i] === journal) {
                            $scope.journals.splice(i, 1);
                        }
                    }
                });
            } else {
                $scope.journal.$remove(function() {
                    $location.path('journals');
                });
            }
        };

        //Add weight easily when resuming an exercise
        $scope.incrementWeight = function(weight) {
            $scope.journal.weight = parseInt($scope.journal.weight, 10) + weight;
            return $scope.journal.weight;
        };

        //Add sets easily when resuming/creating an exercise
        $scope.incrementSets = function() {
            $scope.journal.sets = parseInt($scope.journal.sets, 10) + 1;
            return $scope.journal.sets;
        };
    }
]);