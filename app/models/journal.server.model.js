// Load the module dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Define a new 'JournalSchema'
var JournalSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	exercise: {
		type: String,
		default: '',
		trim: true,
		required: 'Exercise cannot be blank'
	},
	exercise_slug: {
		type: String,
		default: 'undefined'
	},
	sets: {
		type: String,
		default: '',
		trim: true
	},
	reps: {
		type: String,
		default: '',
		trim: true
	},
	weight: {
		type: String,
		default: '',
		trim: true
	},
	creator: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

// Create the 'Journal' model out of the 'JournalSchema'
mongoose.model('Journal', JournalSchema);