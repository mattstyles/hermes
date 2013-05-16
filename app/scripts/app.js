'use strict';

angular.module( 'hermesApp', [ 'ui.bootstrap', 'ui.utils','btford.socket-io' ])
    .config( [ '$routeProvider', '$locationProvider', function ( $routeProvider, $locationProvider ) {
        $routeProvider
        .when( '/', {
            // @todo fix this
            templateUrl: 'scripts/main/mainView.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode( true );
    }]);
