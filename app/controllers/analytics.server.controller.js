var mongoose = require('mongoose'),
	Exercise = mongoose.model('Exercise'),
	moment = require('moment');

exports.getMetaAnalytics = function(req, res) {
	var query = {'creator' : req.user.id }
	
	Exercise.find(query, function(err, exercises) {
		if (err) {
			return res.status(400).send({
				message: err
			});
		} else {
			res.json(analyticsDataMapper(exercises));
		}
	});
};

function analyticsDataMapper(exercises) {
	var analyticsData = {};

	analyticsData.averageDaysBetweenWorkouts = exports.getAverageDaysBetweenWorkouts(exercises);

	return analyticsData;
};

exports.getAverageDaysBetweenWorkouts = function(exercises) {
	var allExerciseDates = [],
		uniqueExerciseDates = [],
		groupOfDaysBetweenExercises = [],
		averageDaysBetweenWorkouts = 0,
		daysBetweenExercises;

	//Push all 'created' dates to new array
	exercises.map(function(singleExercise) {
		allExerciseDates.push(moment(singleExercise.created).startOf('day'));
	});

	//Get the difference between each date, and add each difference (when greater than 0) to new array
	for(var i = 0; i < allExerciseDates.length - 1; i++) {
		daysBetweenExercises = moment(allExerciseDates[i + 1]).diff(moment(allExerciseDates[i]), 'days');

		if(daysBetweenExercises > 0) {
			groupOfDaysBetweenExercises.push(daysBetweenExercises);
		}
	};

	//Get average of all the differences in days
	for(var z = 0; z < groupOfDaysBetweenExercises.length; z++) {
		averageDaysBetweenWorkouts += groupOfDaysBetweenExercises[z];
	};

	averageDaysBetweenWorkouts = averageDaysBetweenWorkouts / groupOfDaysBetweenExercises.length;

	return averageDaysBetweenWorkouts;
};