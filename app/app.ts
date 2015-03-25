/// <reference path="../typings/tsd.d.ts" />
declare var require : any;
import angular = require('angular');
import RoutingUtil = require('./utils/routing-util');

var PatientPathway = angular.module('PatientPathway', [
    'ngRoute',
    'PatientPathway.User',
    'PatientPathway.Pathway'
])
    .controller('Navbar', RoutingUtil.legacyAsyncLoadController('components/navbar/navbar.controller'))
    .config(($routeProvider : ng.route.IRouteProvider) => {
        $routeProvider.when('/style-guide', {
            templateUrl: 'views/style-guide.html'
        });
        $routeProvider.otherwise({redirectTo: '/login'});
    });

export = PatientPathway;