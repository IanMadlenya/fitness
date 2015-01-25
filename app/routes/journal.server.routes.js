// Load the module dependencies
var users = require('../../app/controllers/user.server.controller'),
	journals = require('../../app/controllers/journal.server.controller');

// Define the routes module' method
module.exports = function(app) {
	// Set up the 'journals' base routes 
	app.route('/api/journals')
	   .get(journals.list)
	   .post(users.requiresLogin, journals.create);
	
	// Set up the 'journals' parameterized routes
	app.route('/api/journals/:journalId')
	   .get(journals.read)
	   .put(users.requiresLogin, journals.hasAuthorization, journals.update)
	   .delete(users.requiresLogin, journals.hasAuthorization, journals.delete);

	// Set up the 'journalId' parameter middleware   
	app.param('journalId', journals.journalByID);
};