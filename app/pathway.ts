/// <reference path="../typings/tsd.d.ts" />
import angular = require('angular');
import RoutingUtil = require('./utils/routing-util');

var routes : RoutingUtil.IRoute[] = [
    {
        name: 'Settings',
        path: '/settings',
        controller: 'controllers/settings-controller',
        view: 'views/settings.html'
    },
    {
        name: 'Paths',
        path: '/paths',
        controller: 'controllers/paths-controller',
        view: 'views/paths.html'
    },
    {
        name: 'Pathway',
        path: '/pathway',
        controller: 'controllers/pathway-controller',
        view: 'views/pathway.html'
    }
];

var PatientPathwayPathway = angular.module('PatientPathway.Pathway', ['ngRoute'])
    .controller('SearchBar', RoutingUtil.legacyAsyncLoadController('components/search-bar/search-bar.controller'))
    .controller('Timeline', RoutingUtil.legacyAsyncLoadController('components/timeline/timeline.controller'))
    .config(($routeProvider : ng.route.IRouteProvider, $controllerProvider : ng.IControllerProvider) => {
        RoutingUtil.registerRoutes(routes, $routeProvider, $controllerProvider);
    });

export = PatientPathwayPathway;