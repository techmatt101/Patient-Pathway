/// <reference path="../typings/tsd.d.ts" />

var app = angular.module('PatientPathway', [
    'ngRoute',
    'ngCookies',
    'ngAnimate',
    'angular-loading-bar',
    'PatientPathway.User',
    'PatientPathway.Pathway'
])
    .run(($window) => {
        $window.$ = angular.element;
    })
    .run(($rootScope, cfpLoadingBar) => {
        var timeout;
        $rootScope.$on('$routeChangeStart', function() {
            timeout = setTimeout(() => {
                cfpLoadingBar.start();
                cfpLoadingBar.inc();
            }, 100);
        });
        $rootScope.$on('$routeChangeSuccess', function() {
            clearTimeout(timeout);
            cfpLoadingBar.complete();
        });
    })
    .config(($controllerProvider, $compileProvider, $filterProvider, $provide) => {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
    })
    .config(($routeProvider : ng.route.IRouteProvider, cfpLoadingBarProvider) => {
        cfpLoadingBarProvider.includeSpinner = false;
        $routeProvider.when('/style-guide', {
            templateUrl: 'views/style-guide.html'
        });
        $routeProvider.otherwise({redirectTo: '/login'});
    });

export = app;