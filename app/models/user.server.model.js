var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: {
		type: String,
		index: true,

		//Example of validation-- must meet regex expression to be saved

		match: /.+\@.+\..+/
	},

	username: {
		type: String,

		//This is a built in mongoose modifier...

		trim: true,

		/*And this is an index.  It tells mongoose that 
		the entry must be unique.  This helps build
		efficient queries.  It is common to not allow
		multiple instances of the same username, as we are 
		doing here...*/

		unique: true,

		//Validate the field

		required: true
	},

	website: {
		type: String,

		//And this is an example of a custom modifier...
		//Will add http:// to the site if not already added...

		/*Called a 'getter' modifier (as opposed to a 'setter'), because 
		the modifier will only be applied to previous documents
		at the time of query, as opposed to all at once (as 'setter' does).
		This is presumably useful when adding a modifier to a
		very large database, and performance is a big consideration*/

		get: function(url) {
			if(!url) {
				return url;
			} else {
				if(url.indexOf('http://') !==0 && url.indexOf('https://') !==0 ) {
					url = 'http://' + url;
				}

				return url;
			}
		}

	},

	password: {
		type:String,

		//example of a custom validation function

		validate: [
			function(password) {
				return password.length >= 6;
			},

			'Password should be at least 6 characters'
		]
	},

	created: {
		type: Date,
		default: Date.now
	}
});

/*This is an example of a 'virtual' attribute,
which can take multiple attributes from the Schema
and create a new attribute out of that, but they are
not really presented in the document...*/

UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
});

//Make sure to enable 'getter' modifiers and virtual attributes in this next line

UserSchema.set('toJSON', {getters: true, virtuals: true});

mongoose.model('User', UserSchema);