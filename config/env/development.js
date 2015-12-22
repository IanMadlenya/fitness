module.exports = {
	db: process.env.DATABASE,
	sessionSecret : process.env.SESSION_SECRET,

	//For Oauth...
	google: {
		clientID: process.env.GOOG_CLIENT_ID,
		clientSecret: process.env.GOOG_CLIENT_SECRET,
		callbackURL: 'http://localhost:3000/oauth/google/callback'
	},

	facebook: {
		clientID: process.env.FB_CLIENT_ID,
		clientSecret: process.env.FB_CLIENT_SECRET,
		callbackURL: 'http://localhost:3000/oauth/facebook/callback',
		enableProof: true
	}
};
