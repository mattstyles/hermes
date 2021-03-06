'use strict';

// Dependencies
var server = require( './../server' ).server;


// Router
// Index route - usually served as static via express
server.get( '/', require( './main' ) );

// Example route
server.get( '/route/:route', require( './example' ) );

// Catch all
server.get( '*', require( './main' ) );
