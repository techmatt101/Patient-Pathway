/// <reference path="../typings/tsd.d.ts" />
import RoutingUtil = require('./utils/routing-util');

var routes : RoutingUtil.IRoute[] = [
    {
        name: 'PathsController',
        path: '/paths',
        controller: 'controllers/paths-controller',
        view: 'views/paths.html'
    },
    {
        name: 'PathwayController',
        path: '/pathway',
        controller: 'controllers/pathway-controller',
        view: 'views/pathway.html'
    }
];

var PatientPathwayPathway = angular.module('PatientPathway.Pathway', ['ngRoute'])
    .config(($routeProvider : ng.route.IRouteProvider) => {
        RoutingUtil.registerRoutes(routes, $routeProvider);
    });

export = PatientPathwayPathway;