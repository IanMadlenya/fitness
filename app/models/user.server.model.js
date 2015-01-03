var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	username: {
		type: String,

		//This is a built in mongoose modifier...

		trim: true
	},

	website: {
		type: String,

		//And this is an example of a custom modifier...
		//Will add http:// to the site if not already added...

		set: function(url) {
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

	password: String,
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('User', UserSchema);