/// <reference path="../typings/tsd.d.ts" />
import RoutingUtil = require('./utils/routing-util');

var routes : RoutingUtil.IRoute[] = [
    {
        name: 'SettingsController',
        path: '/settings',
        controller: 'controllers/settings-controller',
        view: 'views/settings.html'
    },
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


////.controller('Navbar', RoutingUtil.legacyAsyncLoadController('components/navbar/navbar.controller'))
////.service('BackendConnectionService', BackendConnectionService) //TODO: it's not async!
//
//.service('UserService', UserService) //TODO: it's not async!
//
//    .service('PathwayService', PathwayService) //TODO: it's not async!
//    .service('PointService', PointService) //TODO: it's not async!
//    .service('MediaService', MediaService) //TODO: it's not async!
//    .controller('Timeline', RoutingUtil.legacyAsyncLoadController('components/timeline/timeline.controller'))
//
//import PathwayService = require('./services/pathway-service');
//import PointService = require('./services/point-service');
//import MediaService = require('./services/media-service');