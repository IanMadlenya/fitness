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

describe('addGivenIntegersByKey', function() {
	it('should return the total of all values matching the given key', function() {
		assert.deepEqual(analyticsController.addGivenIntegersByKey(mockExerciseData, 'weight'), 900);
	});
});