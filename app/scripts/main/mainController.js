'use strict';

angular.module( 'hermesApp' )
    .controller( 'MainCtrl', [ '$scope', 'socket', function( $scope, socket ) {

        // The messages stack
        $scope.messages = [];

        // A single message
        $scope.message = '';

        // The client user name
        $scope.name = '';

        // The users’ stack
        $scope.users = [];


        // The iScroll object
        var iScroll = new window.iScroll( 'wrapper', {
            bounce: false,
            momentum: true,
            wheelAction: 'scroll',
            hScrollbar: true
        } );

        /**
         * Add an event handler to the window to resize the textarea when the window changes size
         */
        $(window).resize( function() {
            $('#input').attr( 'rows', $scope.initInput());
        });

        /**
         * Initialises the input box
         * Sets the number of rows to 4 on desktop and 2 on touch devices
         */
        $scope.initInput = function() {
            return $('body').width() < 979 ? 2 : 4;
        };

        /**
         * Send Message
         * on button press and on enter
         * Prevents the default line break behaviour and pushes the message to the list of messages
         */
        $scope.sendMessage = function( $event, refresh ) {
            // Push a new message object on to the messages stack
            $scope.messages.push( { user: '', msg: $scope.message } );

            // Emit an event to inform other users of this message
            socket.emit( 'send:message', {
                msg: $scope.message
            } );

            // Reset the scope message to communicate back to the textarea
            $scope.message = '';

            // Refresh iscroll once the DOM has changed and make sure the new message is visible
            _.defer( function() {
                iScroll.refresh();

                // Only attempt to scroll if there are elements lower on the page
                if ( iScroll.maxScrollY < 0 ) {
                    iScroll.scrollTo(0, iScroll.maxScrollY, 0);
                }

                // Scroll the body to the top to account for the change in position when the keyboard is dismissed on iOS
                // @todo add modernizr here
                if ( refresh && Modernizr.touch ) {
                    $( 'html, body' ).animate( { scrollTop: 0 }, 'slow' );
                }
            });

            // Prevent the default line-break behaviour
            $event.preventDefault();
        };

        /*********************
         *
         * Socket Listeners
         *
         *********************/

        /**
         * Listening for a message pushed to the stack by another user
         */
        socket.on( 'send:message', function( data ) {
            $scope.messages.push( { user: '', msg: data.msg } );
        });

        /**
         * Listens for this client user being connected
         */
        socket.on( 'user:connected', function( data ) {
            $scope.name = data.name;
            $scope.users = data.users;
        });

        /**
         * Listens for other clients being connected
         */
        socket.on( 'user:join', function( data ) {
            // Push a message onto the message stack to inform of a new user joining
            $scope.messages.push( {
                user: '',
                msg: data.name + ' has joined'
            });

            // Push the user on to the user stack
            $scope.users.push( data.name );
        });

        /**
         * Listens for other clients disconnecting
         */
        socket.on( 'user:disconnect', function( data ) {
            // Push a message onto the message stack to inform of a user disconnecting
            $scope.messages.push( {
                user: '',
                msg: data.name + ' has left'
            });

            // Remove the user from the users stack
            var i,
                user;

            for ( i = 0; i < $scope.users.length; i += 1 ) {
                user = $scope.users[ i ];
                if ( user === data.name ) {
                    $scope.users.splice( i, 1 );
                    break;
                }
            }
        });

    }]);
