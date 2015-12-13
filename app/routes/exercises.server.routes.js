var users = require('../../app/controllers/user.server.controller'),
	exercises = require('../../app/controllers/exercises.server.controller');

module.exports = function(app) {
	app.route('/api/exercises')
	   .get(exercises.list)
	   .post(users.requiresLogin, exercises.create);
	
	app.route('/api/exercises/:exerciseId')
	   .get(exercises.read)
	   .put(users.requiresLogin, exercises.hasAuthorization, exercises.update)
	   .delete(users.requiresLogin, exercises.hasAuthorization, exercises.delete);

	app.param('exerciseId', exercises.exerciseByID);  

};