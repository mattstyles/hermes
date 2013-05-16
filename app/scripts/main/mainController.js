'use strict';

angular.module( 'hermesApp' )
    .controller( 'MainCtrl', [ '$scope', 'socket', '$location', '$window', function( $scope, socket, $location, $window ) {

        $scope.messages = [
            { name: 'Albert', msg: 'How are you?' },
            { name: 'Bernhard', msg: 'This is fun' },
            { name: 'Cecil', msg: 'Angularise yo\' bad self' }
        ];

    }]);
