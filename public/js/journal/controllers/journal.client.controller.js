// Create the 'journals' controller
angular.module('journal').controller('JournalController', ['$scope', '$routeParams', '$location', 'Authentication', 'Journals',
    function($scope, $routeParams, $location, Authentication, Journals) {
        // Expose the Authentication service
        $scope.authentication = Authentication;

        $scope.contentLoaded = false;

        // Create a new controller method for creating new journals
        $scope.create = function() {
            // Use the form fields to create a new journal $resource object
            var journal = new Journals({
                exercise: this.exercise,
                exercise_slug: this.exercise.replace(/\s+/g, '-').toLowerCase(),
                sets: this.sets,
                reps: this.reps,
                weight: this.weight
            });

            // Use the journal '$save' method to send an appropriate POST request
            journal.$save(function(response) {
                // If a journal was created successfully, redirect the user to the journal's page
                $location.path('journals/' + response._id);
            }, function(errorResponse) {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for resuming an exercise
        $scope.resume = function() {
            // Use the form fields to create a new journal $resource object
            var journal = new Journals({
                exercise: this.journal.exercise,
                exercise_slug: this.journal.exercise.replace(/\s+/g, '-').toLowerCase(),
                sets: this.journal.sets,
                reps: this.journal.reps,
                weight: this.journal.weight
            });

            // Use the journal '$save' method to send an appropriate POST request
            journal.$save(function(response) {
                // If a journal was created successfully, redirect the user to the journal's page
                $location.path('journals/' + response._id);
            }, function(errorResponse) {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for retrieving a list of journals
        $scope.find = function() {
            // Use the journal 'query' method to send an appropriate GET request
            $scope.journals = Journals.query();
            $scope.contentLoaded = true;
        };

        // Create a new controller method for retrieving a single exercise
        $scope.findOne = function() {
            // Use the journal 'get' method to send an appropriate GET request
            $scope.journal = Journals.get({
                journalId: $routeParams.journalId
            });
        };

        // Create a new controller method for retrieving a group of exercises by name
        $scope.findExercisesByName = function() {
            // Use the journal 'get' method to send an appropriate GET request
            $scope.journals = Journals.query({
                exercise_slug: $routeParams.exercise_slug
            });
        };

        // Create a new controller method for updating a single journal
        $scope.update = function() {
            // Use the journal '$update' method to send an appropriate PUT request
            $scope.journal.$update(function() {
                // If a journal was updated successfully, redirect the user to the journal's page 
                $location.path('journals/' + $scope.journal._id);
            }, function(errorResponse) {
                // Otherwise, present the user with the error message
                $scope.error = errorResponse.data.message;
            });
        };

        // Create a new controller method for deleting a single journal
        $scope.delete = function(journal) {
            // If an journal was sent to the method, delete it
            if (journal) {
                // Use the journal '$remove' method to delete the journal
                journal.$remove(function() {
                    // Remove the journal from the journals list
                    for (var i in $scope.journals) {
                        if ($scope.journals[i] === journal) {
                            $scope.journals.splice(i, 1);
                        }
                    }
                });
            } else {
                // Otherwise, use the journal '$remove' method to delete the journal
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