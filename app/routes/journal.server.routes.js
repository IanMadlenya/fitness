var users = require('../../app/controllers/user.server.controller'),
	journals = require('../../app/controllers/journal.server.controller');

module.exports = function(app) {
	app.route('/api/journals')
	   .get(journals.list)
	   .post(users.requiresLogin, journals.create);
	
	app.route('/api/journals/:journalId')
	   .get(journals.read)
	   .put(users.requiresLogin, journals.hasAuthorization, journals.update)
	   .delete(users.requiresLogin, journals.hasAuthorization, journals.delete);

	app.param('journalId', journals.journalByID);  

};