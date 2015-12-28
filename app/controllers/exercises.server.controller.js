var mongoose = require('mongoose'),
	Exercise = mongoose.model('Exercise');

var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

// Create
exports.create = function(req, res) {
	var exercise = new Exercise(req.body);

	exercise.creator = req.user;

	exercise.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(exercise);
		}
	});
};

// List
exports.list = function(req, res) {

	if(req.query.exerciseSlug) {
		var query = {'creator' : req.user.id, 'exerciseSlug' : req.query.exerciseSlug };
	} else {
		var query = {'creator' : req.user.id }
	} 

	Exercise.find(query, function(err, exercises) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(exercises);
		}
	});
};

// Read
exports.read = function(req, res) {
	res.json(req.exercise);
};

// Update
exports.update = function(req, res) {
	var exercise = req.exercise;

	// Update the Exercise fields
	exercise.sets = req.body.sets
	exercise.exercise = req.body.exercise;
	exercise.weight = req.body.weight;
	exercise.reps = req.body.reps;

	// Try saving the updated Exercise
	exercise.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(exercise);
		}
	});
};

// Delete
exports.delete = function(req, res) {
	var exercise = req.exercise;

	exercise.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(exercise);
		}
	});
};

// Get single by ID
exports.exerciseByID = function(req, res, next, id) {
	Exercise.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, exercise) {
		if (err) return next(err);
		if (!exercise) return next(new Error('Failed to load Exercise ' + id));

		// If found use the 'request' object to pass it to the next middleware
		req.exercise = exercise;

		next();
	});
};


// Auth
exports.hasAuthorization = function(req, res, next) {
	if (req.exercise.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};