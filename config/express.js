/*
The express.js file is where we configure our express application
This is where we add everything related to the express configuration
*/

var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');


module.exports = function() {

	var app = express();

	if(process.env.NODE_ENV === 'development') {

		app.use(morgan('dev'));

	} else if (process.env.NODE_ENV === 'production') {

		app.use(compress());

	}

	app.use(bodyParser.json());

	app.use(methodOverride());

	require('../app/routes/index.server.routes.js')(app);

	return app;
};