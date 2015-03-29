/// <reference path="../typings/tsd.d.ts" />
import RoutingUtil = require('./utils/routing-util');

import BackendConnectionService = require('./services/backend-connection-service');

var PatientPathway = angular.module('PatientPathway', [
    'ngRoute',
    'ngCookies',
    'ngAnimate',  //TODO: hopefully remove this soon as it's only needed for the loading bar - https://github.com/chieffancypants/angular-loading-bar/issues/33
    'angular-loading-bar',
    'PatientPathway.User',
    'PatientPathway.Pathway'
])
    .run(($rootScope, cfpLoadingBar) => {
        var timeout;
        $rootScope.$on('$routeChangeStart', function() {
            timeout = setTimeout(() => {
                cfpLoadingBar.start();
                cfpLoadingBar.inc();
            }, 100);
        });
        $rootScope.$on('$routeChangeSuccess', function() {
            clearTimeout(timeout);
            cfpLoadingBar.complete();
        });
    })
    .controller('Navbar', RoutingUtil.legacyAsyncLoadController('components/navbar/navbar.controller'))
    .service('BackendConnectionService', BackendConnectionService) //TODO: it's not async!
    .config(($routeProvider : ng.route.IRouteProvider, cfpLoadingBarProvider) => {
        cfpLoadingBarProvider.includeSpinner = false;
        $routeProvider.when('/style-guide', {
            templateUrl: 'views/style-guide.html'
        });
        $routeProvider.otherwise({redirectTo: '/login'});
    });

export = PatientPathway;