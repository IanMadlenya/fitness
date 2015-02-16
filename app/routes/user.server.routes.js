var users = require('../../app/controllers/user.server.controller'),
	passport = require('passport');

module.exports = function(app) {
	app.route('/signup')
		.get(users.renderSignup)
		.post(users.signup);

	app.route('/signin')
		.get(users.renderSignin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/signin',
			failureFlash: true
		}));

	

	app.get('/signout', users.signout);

	//Set up Google+ Oauth routes

	app.get('/oauth/google', passport.authenticate('google', {
		failureRedirect: '/signin',
		scope: [
			'https://www.googleapis.com/auth/userinfo.profile', 
			'https://www.googleapis.com/auth/userinfo.email'
		],
	}));

	app.get('/oauth/google/callback', passport.authenticate('google', {
		failureRedirect: 'signin',
		successRedirect: '/'
	}));

	//Set up Facebook Oauth routes

	app.get('/oauth/facebook', passport.authenticate('facebook', {
		scope: ['email']
	}));

	app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
		failureRedirect: '/signin',
		successRedirect: '/'
	}));
};