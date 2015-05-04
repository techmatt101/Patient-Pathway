/// <reference path="../typings/tsd.d.ts" />
import Helpers = require('utils/helpers');
var base = <any>document.getElementsByTagName('base');
var baseUrl = (base[0]) ? base[0].href.replace(location.protocol + '//' + location.host, '') : '/';
var usingHtml5Mode = Helpers.supportsHistoryApi() && typeof base[0] !== 'undefined'; //TODO: setup config

var app = angular.module('PatientPathway', [
    'ngRoute',
    'ngCookies',
    'ngAnimate',
    'ngDialog',
    'angular-loading-bar',
    'infinite-scroll',
    'PatientPathway.User',
    'PatientPathway.Pathway'
])
    .run(($window) => {
        $window.$ = angular.element;
    })
    .run(($rootScope : ng.IRootScopeService, cfpLoadingBar) => {
        var timeout;
        $rootScope.$on('$routeChangeStart', () => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                cfpLoadingBar.start();
                cfpLoadingBar.inc();
            }, 100);
        });
        $rootScope.$on('$routeChangeSuccess', () => {
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
    .config(($routeProvider : ng.route.IRouteProvider, $locationProvider : ng.ILocationProvider, cfpLoadingBarProvider) => {
        cfpLoadingBarProvider.includeSpinner = false;
        $locationProvider.html5Mode(usingHtml5Mode);
        $routeProvider.when('/', { redirectTo: '/login' });
        $routeProvider.when('/404', {
            templateUrl: 'views/404.html'
        });
        $routeProvider.when('/style-guide', {
            templateUrl: 'views/style-guide.html'
        });
        $routeProvider.otherwise({ redirectTo: '/404' });
    });

app.directive('ngRoute', () => {
    return {
        restrict: 'A',
        link: (scope, el, attr : any) => {
            if (attr.ngRoute) el.attr('href', Helpers.pathJoin(((!usingHtml5Mode) ? '#' : baseUrl), attr.ngRoute));
        }
    }
});

app.filter('capitalize', function() {
    return function(input, all) {
        return (!!input) ? input.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }) : '';
    }
});

export = app;