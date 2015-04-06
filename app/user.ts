/// <reference path="../typings/tsd.d.ts" />
import RoutingUtil = require('./utils/routing-util');

var routes : RoutingUtil.IRoute[] = [
    {
        title: 'Sign In',
        name: 'LoginController',
        path: '/login',
        controller: 'controllers/login-controller',
        view: 'views/login.html'
    },
    {
        title: 'Reset Password',
        name: 'ResetPasswordController',
        path: '/reset-password',
        controller: 'controllers/reset-password-controller',
        view: 'views/reset-password.html'
    },
    {
        title: 'Settings',
        name: 'SettingsController',
        path: '/settings',
        controller: 'controllers/settings-controller',
        view: 'views/settings.html'
    },
];

var PatientPathwayUser = angular.module('PatientPathway.User', [])
    .config(($routeProvider : ng.route.IRouteProvider) => {
        RoutingUtil.registerRoutes(routes, $routeProvider);
    });

export = PatientPathwayUser;