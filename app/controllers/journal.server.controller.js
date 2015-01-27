// Load the module dependencies
var mongoose = require('mongoose'),
	Journal = mongoose.model('Journal');

// Create a new error handling controller method
var getErrorMessage = function(err) {
	if (err.errors) {
		for (var errName in err.errors) {
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	} else {
		return 'Unknown server error';
	}
};

// Create a new controller method that creates new journals
exports.create = function(req, res) {
	// Create a new journal object
	var journal = new Journal(req.body);

	// Set the journal's 'creator' property
	journal.creator = req.user;

	// Try saving the journal
	journal.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the journal 
			res.json(journal);
		}
	});
};

// Create a new controller method that retrieves a list of journals
exports.list = function(req, res) {
	// Use the model 'find' method to get a list of journals
	Journal.find( {'creator' : req.user.id } , function(err, journals) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the journal 
			res.json(journals);
		}
	});
};

// Create a new controller method that returns an existing journal
exports.read = function(req, res) {
	res.json(req.journal);
};

// Create a new controller method that updates an existing journal
exports.update = function(req, res) {
	// Get the journal from the 'request' object
	var journal = req.journal;

	// Update the journal fields
	journal.exercise = req.body.exercise;
	journal.weight = req.body.weight;
	journal.reps = req.body.reps;

	// Try saving the updated journal
	journal.save(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the journal 
			res.json(journal);
		}
	});
};

// Create a new controller method that delete an existing journal
exports.delete = function(req, res) {
	// Get the journal from the 'request' object
	var journal = req.journal;

	// Use the model 'remove' method to delete the journal
	journal.remove(function(err) {
		if (err) {
			// If an error occurs send the error message
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		} else {
			// Send a JSON representation of the journal 
			res.json(journal);
		}
	});
};

// Create a new controller middleware that retrieves a single existing journal
exports.journalByID = function(req, res, next, id) {
	// Use the model 'findById' method to find a single journal 
	Journal.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, journal) {
		if (err) return next(err);
		if (!journal) return next(new Error('Failed to load journal ' + id));

		// If an journal is found use the 'request' object to pass it to the next middleware
		req.journal = journal;

		// Call the next middleware
		next();
	});
};

// Create a new controller middleware that is used to authorize a journal operation 
exports.hasAuthorization = function(req, res, next) {
	// If the current user is not the creator of the journal send the appropriate error message
	if (req.journal.creator.id !== req.user.id) {
		return res.status(403).send({
			message: 'User is not authorized'
		});
	}

	// Call the next middleware
	next();
};