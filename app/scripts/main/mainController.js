'use strict';

angular.module( 'hermesApp' )
    .controller( 'MainCtrl', [ '$scope', 'socket', function( $scope, socket ) {

        $scope.messages = [
            { name: 'Albert', msg: 'How are you?' },
            { name: 'Bernhard', msg: 'This is fun' },
            { name: 'Cecil', msg: 'Angularise yo\' bad self' }
        ];

    }]);
