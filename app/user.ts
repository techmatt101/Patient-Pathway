/// <reference path="../typings/tsd.d.ts" />
import angular = require('angular');
import RoutingUtil = require('./utils/routing-util');

var routes : RoutingUtil.IRoute[] = [
    {
        name: 'Login',
        path: '/login',
        controller: 'controllers/login-controller',
        view: 'views/login.html'
    }
];

var PatientPathwayUser = angular.module('PatientPathway.User', ['ngRoute'])
    .config(($routeProvider : ng.route.IRouteProvider, $controllerProvider : ng.IControllerProvider) => {
        RoutingUtil.registerRoutes(routes, $routeProvider, $controllerProvider);
    });

export = PatientPathwayUser;