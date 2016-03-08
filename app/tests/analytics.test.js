var assert = require('assert'),
	mockExerciseData = require('./mocks/exercises'),
	mongoose = require('mongoose');

//Mock the Exercise mongoose model
mongoose.model('Exercise', new mongoose.Schema());

var Exercise = mongoose.model('Exercise'),
	analyticsController = require('../controllers/analytics.server.controller');

describe('getAverageDaysBetweenWorkouts', function() {
	it('should return the average number of days between each exercise', function() {
		assert.deepEqual(analyticsController.getAverageDaysBetweenWorkouts(mockExerciseData), 3);
	});
});

describe('addGivenIntegersByKey - weight', function() {
	it('should return the total of all weight from all exercises', function() {
		assert.deepEqual(analyticsController.addGivenIntegersByKey(mockExerciseData, 'weight'), 1000);
	});
});

describe('addGivenIntegersByKey - reps', function() {
	it('should return the total of all reps from all exercises', function() {
		assert.deepEqual(analyticsController.addGivenIntegersByKey(mockExerciseData, 'reps'), 7);
	});
});

describe('getHighestValueByKey - weight', function() {
	it('should return the highest value of weight for the given exercise', function() {
		assert.deepEqual(analyticsController.getHighestValueByKey(mockExerciseData, 'weight'), 400);
	});
});

describe('getHighestValueByKey - reps', function() {
	it('should return the highest value of reps for the given exercise', function() {
		assert.deepEqual(analyticsController.getHighestValueByKey(mockExerciseData, 'reps'), 3);
	});
});