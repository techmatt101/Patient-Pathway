/// <reference path="../typings/tsd.d.ts" />

declare var UserPermissions;
import RoutingUtil = require('utils/routing-util');
import Permissions = require('types/permissions');
import UserService = require('services/user-service');
import ThemeService = require('services/theme-service');
var imported = [UserService, ThemeService]; //TODO: HACK!!!

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
    .run(($rootScope, ThemeService) => { //TODO: does not belong here!
        $rootScope.changeTheme = () => ThemeService.toggleTheme('high-contrast');
    })
    .config(($routeProvider : ng.route.IRouteProvider) => {
        RoutingUtil.registerRoutes(routes, $routeProvider);
    });

export = PatientPathwayPathway;