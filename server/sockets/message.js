'use strict';

// Dependencies
module.exports = function( socket ) {

    // Example event
    socket.on( 'send:message', function( data ) {

        /**
         * Emit the message to other users
         */
        socket.broadcast.emit( 'send:message', {
            msg: data.msg
        } );
    } );

};
