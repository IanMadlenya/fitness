var express = require( './config/express' );
var app = express();


app.listen( 3000 );


console.log( 'Magic happens on port 3000' );


module.exports = app;