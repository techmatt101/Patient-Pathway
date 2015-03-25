/// <reference path="../typings/tsd.d.ts" />
import angular = require('angular');
import UserService = require('./services/user-service');
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
    .service('UserService', UserService) //TODO: it's not async!
    .config(($routeProvider : ng.route.IRouteProvider, $controllerProvider : ng.IControllerProvider) => {
        RoutingUtil.registerRoutes(routes, $routeProvider, $controllerProvider);
    });

export = PatientPathwayUser;