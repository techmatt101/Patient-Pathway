/// <reference path="../typings/tsd.d.ts" />
declare var UserPermissions;
import RoutingUtil = require('./utils/routing-util');
import UserService = require('./services/user-service');
var imported = [UserService]; //TODO: HACK!!!

var routes : RoutingUtil.IRoute[] = [
    {
        title: 'Paths',
        name: 'PathsController',
        path: '/paths',
        controller: 'controllers/paths-controller',
        view: 'views/paths.html',
        permissionLevel: UserPermissions.PATIENT
    },
    {
        title: 'Pathway',
        name: 'PathwayController',
        path: '/pathway/:id',
        controller: 'controllers/pathway-controller',
        view: 'views/pathway.html',
        permissionLevel: UserPermissions.PATIENT
    }
];

var PatientPathwayPathway = angular.module('PatientPathway.Pathway', [])
    .config(($routeProvider : ng.route.IRouteProvider) => {
        RoutingUtil.registerRoutes(routes, $routeProvider);
    });

export = PatientPathwayPathway;