var users = require('../../app/controllers/user.server.controller');

module.exports = function(app) {
	app.route('/users')
		.post(users.create)
		.get(users.list);
};