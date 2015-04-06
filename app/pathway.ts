/// <reference path="../typings/tsd.d.ts" />
import RoutingUtil = require('./utils/routing-util');

var routes : RoutingUtil.IRoute[] = [
    {
        title: 'Paths',
        name: 'PathsController',
        path: '/paths',
        controller: 'controllers/paths-controller',
        view: 'views/paths.html'
    },
    {
        title: 'Pathway',
        name: 'PathwayController',
        path: '/pathway/:id',
        controller: 'controllers/pathway-controller',
        view: 'views/pathway.html'
    }
];

var PatientPathwayPathway = angular.module('PatientPathway.Pathway', [])
    .config(($routeProvider : ng.route.IRouteProvider) => {
        RoutingUtil.registerRoutes(routes, $routeProvider);
    });

export = PatientPathwayPathway;