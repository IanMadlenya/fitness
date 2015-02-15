//Define environment

/*

It is recommended that you set the NODE_ENV variable
in your operating system prior to running your app

On Unix systems :

$ export NODE_ENV=development

*/

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Load Express and Mongoose configuration

var express = require( './config/express' ),
	mongoose = require('./config/mongoose'),
	passport = require('./config/passport');

var db = mongoose();

//Start the server and run the app

var app = express();
var passport = passport();


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});




module.exports = app;