var mongoose = require('mongoose'),
	Exercise = mongoose.model('Exercise'),
	moment = require('moment');

exports.getMetaAnalytics = function(req, res) {
	var query = {'creator' : req.user.id }
	
	Exercise.find(query, function(err, exercises) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(analyticsDataMapper(exercises));
		}
	});
};

function analyticsDataMapper(exercises) {
	var analyticsData = {};

	analyticsData.exerciseFrequency = getExerciseFrequency(exercises);

	return analyticsData;
};

function getExerciseFrequency(exercises) {
	var allExerciseDates = [],
		uniqueExerciseDates = [],
		groupOfDaysBetweenExercises = [],
		averageDaysBetweenWorkout = 0;

	exercises.map(function(singleExercise) {
		allExerciseDates.push(moment(singleExercise.created).format('YYYY MM DD'));
	});

	uniqueExerciseDates = allExerciseDates.filter(function(elem, pos) {
    	return allExerciseDates.indexOf(elem) === pos;
	});

	for(var i = 0; i < uniqueExerciseDates.length - 1; i++) {
		var daysBetweenExercises = moment(uniqueExerciseDates[i + 1]).diff(moment(uniqueExerciseDates[i]), 'days');
		groupOfDaysBetweenExercises.push(daysBetweenExercises);
	};

	for(var z = 0; z < groupOfDaysBetweenExercises.length; z++) {
		averageDaysBetweenWorkout += groupOfDaysBetweenExercises[z];
	};

	averageDaysBetweenWorkout = averageDaysBetweenWorkout / groupOfDaysBetweenExercises.length;

	return averageDaysBetweenWorkout;
};