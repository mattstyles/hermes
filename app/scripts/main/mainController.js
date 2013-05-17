'use strict';

angular.module( 'hermesApp' )
    .controller( 'MainCtrl', [ '$scope', 'socket', function( $scope, socket ) {

        // The messages stack
        $scope.messages = [];

        // A single message
        $scope.message = '';

        // The iScroll object
        var iScroll = new window.iScroll( 'wrapper', {
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
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                }
            });

            // Prevent the default line-break behaviour
            $event.preventDefault();
        };

    }]);
