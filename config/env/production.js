/*

During app development, you will often need to configure
third-party modules to run differently in various environments.

You can manage a set of environment configuration files third-party
holds these properties.  You can then use the process.env.NODE_ENV
environment variable to determine which config file to load.

*/

module.exports = {

	//These are config vars set in Heroku...

	db: process.env.DATABASE,
	sessionSecret : process.env.SESSION_SECRET,

	//For Oauth...
	//You'd add other social media accounts (FB, Twitter) here, too...
	google: {
		clientID: process.env.GOOG_CLIENT_ID,
		clientSecret: process.env.GOOG_CLIENT_SECRET,
		callbackURL: 'http://fitness.devdewitt.com/oauth/google/callback'
	},

	facebook: {
		clientID: process.env.FB_CLIENT_ID,
		clientSecret: process.env.FB_CLIENT_SECRET,
		callbackURL: 'http://fitness.devdewitt.com/oauth/facebook/callback',
		enableProof: true
	}
};