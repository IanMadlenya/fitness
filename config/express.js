/*
The express.js file is where we configure our express application
This is where we add everything related to the express configuration
*/

var config = require('./config'),
	express = require('express'),
	morgan = require('morgan'),
	compress = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override'),
	session = require('express-session'),
	flash = require('connect-flash'),
	passport = require('passport');


module.exports = function() {

	var app = express();

	if(process.env.NODE_ENV === 'development') {

		app.use(morgan('dev'));

	} else if (process.env.NODE_ENV === 'production') {

		app.use(compress());

	}

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(bodyParser.json());

	app.use(methodOverride());

	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret
	}));

	//ejs

	app.set('views', './app/views');

	app.set('view engine', 'ejs');

	//flash and passport

	app.use(flash());
	app.use(passport.initialize());
	app.use(passport.session());

	//routes

	require('../app/routes/index.server.routes.js')(app);
	require('../app/routes/user.server.routes.js')(app);
	require('../app/routes/journal.server.routes.js')(app);

	//serve static files

	/*Notice how this is below the call to the routes.
	This matters because express would try to look for HTTP
	request paths in the static files folder- this would be SLOW*/

	app.use(express.static('./public'));

	//return all...

	return app;
};