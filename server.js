//Define environment

/*

It is recommended that you set the NODE_ENV variable
in your operating system prior to running your app

On Unix systems :

$ export NODE_ENV=developemt

*/

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//Load Express configuration

var express = require( './config/express' );

//Start the server and run the app

var app = express();


app.listen( 3000 );


console.log( 'Magic happens on port 3000' );


module.exports = app;