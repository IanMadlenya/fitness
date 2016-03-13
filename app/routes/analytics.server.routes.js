var users = require('../../app/controllers/user.server.controller'),
	analytics = require('../../app/controllers/analytics.server.controller');

module.exports = function(app) {
	app.route('/api/analytics')
	   .get(analytics.getMetaAnalytics);

	app.route('/api/analytics/individualExercise/:slug')
	   .get(analytics.getIndividualExerciseAnalytics);

	app.param('slug', analytics.getIndividualExerciseAnalytics);
};