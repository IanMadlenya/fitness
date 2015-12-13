var users = require('../../app/controllers/user.server.controller'),
	email = require('../../app/controllers/email.server.controller');

module.exports = function(app) {
	app.route('/api/email/send-email')
	   .post(users.requiresLogin, email.sendEmail);
};