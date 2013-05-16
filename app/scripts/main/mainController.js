'use strict';

angular.module( 'hermesApp' )
    .controller( 'MainCtrl', [ '$scope', 'socket', function( $scope, socket ) {

        // The messages stack
        $scope.messages = [];

        // A single message
        $scope.message = '';

        /**
         * Keypress Event - Enter
         * Prevents the default line break behaviour and pushes the message
         */
        $scope.keypressEnter = function( $event ) {
            // Push a new message object on to the messages stack
            $scope.messages.push( { user: '', msg: $scope.message } );

            // Reset the scope message to communicate back to the textarea
            $scope.message = '';

            // Ensure that window is scrolled to the bottom so that any new messages can be seen
            $("html, body").animate({ scrollTop: $(document).height() }, "slow");

            // Prevent the default line-break behaviour
            $event.preventDefault();
        };

    }]);
