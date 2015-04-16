/// <reference path="../typings/tsd.d.ts" />
import RoutingUtil = require('./utils/routing-util');
import UserService = require('./services/user-service');
var imported = [UserService]; //TODO: HACK!!!

enum Permissions { //TODO: hmmm...
    GUEST,
    PATIENT,
    CLINICIAN,
    TEAM_LEADER
}

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
        view: 'views/settings.html',
        permissionLevel: Permissions.PATIENT
    },
];

var PatientPathwayUser = angular.module('PatientPathway.User', [])
    .run(($rootScope, $location : ng.ILocationService, UserService : UserService) => {
        UserService.checkSession();
        $rootScope.User = UserService.User;
        $rootScope.$on('$routeChangeStart', (event, next : any) => {
            if (typeof next.$$route.permissionLevel !== 'undefined' && next.$$route.permissionLevel > UserService.User.permissionLevel) {
                $location.path('/login');
            }
        });
    })
    .config(($routeProvider : ng.route.IRouteProvider) => {
        RoutingUtil.registerRoutes(routes, $routeProvider);

        $routeProvider.when('/logout', {
            controller: ($rootScope, $location : ng.ILocationService, $timeout, UserService : UserService) => {
                $rootScope.title = 'Logout';
                UserService.logout();
                $timeout(() => {
                    $location.path('/login');
                }, 1000 * 3); //Ten Seconds
            },
            templateUrl: 'views/logout.html'
        });
    });

export = PatientPathwayUser;