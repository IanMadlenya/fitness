var mongoose = require('mongoose'),
	Journal = mongoose.model('Journal');

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
	var journal = new Journal(req.body);

	journal.creator = req.user;

	journal.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(journal);
		}
	});
};

// List
exports.list = function(req, res) {

	if(req.query.exercise_slug) {

		var query = {'creator' : req.user.id, 'exercise_slug' : req.query.exercise_slug };
	
	} else {
		
		var query = {'creator' : req.user.id }
		
	} 

	Journal.find( query , function(err, journals) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(journals);
		}
	});
};

// Read
exports.read = function(req, res) {
	res.json(req.journal);
};

// Update
exports.update = function(req, res) {
	var journal = req.journal;

	// Update the journal fields
	journal.sets = req.body.sets
	journal.exercise = req.body.exercise;
	journal.weight = req.body.weight;
	journal.reps = req.body.reps;

	// Try saving the updated journal
	journal.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(journal);
		}
	});
};

// Delete
exports.delete = function(req, res) {
	var journal = req.journal;

	journal.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			res.json(journal);
		}
	});
};

// Get single by ID
exports.journalByID = function(req, res, next, id) {
	Journal.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, journal) {
		if (err) return next(err);
		if (!journal) return next(new Error('Failed to load journal ' + id));

		// If found use the 'request' object to pass it to the next middleware
		req.journal = journal;

		next();
	});
};


// Auth
exports.hasAuthorization = function(req, res, next) {
	if (req.journal.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	next();
};