/// <reference path="../typings/tsd.d.ts" />
import RoutingUtil = require('./utils/routing-util');

enum Permissions { //TODO: hmmm...
    GUEST,
    PATIENT,
    CLINICIAN,
    TEAM_LEADER
}

var routes : RoutingUtil.IRoute[] = [
    {
        title: 'Paths',
        name: 'PathsController',
        path: '/paths',
        controller: 'controllers/paths-controller',
        view: 'views/paths.html',
        permissionLevel: Permissions.PATIENT
    },
    {
        title: 'Pathway',
        name: 'PathwayController',
        path: '/pathway/:id',
        controller: 'controllers/pathway-controller',
        view: 'views/pathway.html',
        permissionLevel: Permissions.PATIENT
    }
];

var PatientPathwayPathway = angular.module('PatientPathway.Pathway', [])
    .config(($routeProvider : ng.route.IRouteProvider) => {
        RoutingUtil.registerRoutes(routes, $routeProvider);
    });

export = PatientPathwayPathway;