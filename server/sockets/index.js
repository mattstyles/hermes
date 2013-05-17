'use strict';

// Main sockets object
var io = require( './../server' ).io;

// Connection route - bootstraps the other socket routes
io.sockets.on( 'connection', function( socket ) {

    /**
     * Message socket
     * Handles posting messages to the message stack
     */
    require( './message' )( socket );

} );
