/*
The express.js file is where we configure our express application
This is where we add everything related to the express configuration
*/

var express = require('express');

module.exports = function() {
	var app = express();

	require('../app/routes/index.server.routes.js')(app);

	return app;
};