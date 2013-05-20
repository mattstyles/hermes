'use strict';

// Create the user names object that keeps track of the user names as they are used
var userNames = (function() {

    var names = {};

    var claim = function( name ) {
        if (!name || names[ name ]) {
            return false;
        } else {
            names[ name ] = true;
            return true;
        }
    };

    var getGuestName = function() {
        var name,
            nextUserId = 1;

        do {
            name = 'Guest ' + nextUserId;
            nextUserId += 1;
        } while ( !claim( name ) );

        return name;
    };

    var get = function( name ) {
        var res = [];

        for ( var user in names ) {
            if ( names.hasOwnProperty( user ) ) {
                res.push( user );
            }
        }

        return res;
    };

    var free = function( name ) {
        if ( names[ name ] ) {
            delete names[ name ];
        }
    };

    // Expose API
    return {
        claim        : claim,
        free         : free,
        get          : get,
        getGuestName : getGuestName
    };

})();


// Export the socket connections
module.exports = function( socket ) {
    var name = userNames.getGuestName();

    // Initialise a new user with a name
    socket.emit( 'user:connected', {
        name : name,
        users: userNames.get()
    });

    // Notify other clients of a new user
    socket.broadcast.emit( 'user:join', {
        name : name
    });

    // Clean up when a user leaves
    socket.on( 'disconnect', function() {
        socket.broadcast.emit( 'user:disconnect', {
            name : name
        });

        userNames.free( name );
    });
};