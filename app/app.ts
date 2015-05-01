/// <reference path="../typings/tsd.d.ts" />

var app = angular.module('PatientPathway', [
    'ngRoute',
    'ngCookies',
    'ngAnimate',
    'angular-loading-bar',
    'btford.modal',
    'infinite-scroll',
    'PatientPathway.User',
    'PatientPathway.Pathway'
])
    .run(($window, $rootScope) => {
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
    .config(($routeProvider : ng.route.IRouteProvider, cfpLoadingBarProvider) => {
        cfpLoadingBarProvider.includeSpinner = false;
        $routeProvider.when('/', { redirectTo: '/login' });
        $routeProvider.when('/404', {
            templateUrl: 'views/404.html'
        });
        $routeProvider.when('/style-guide', {
            templateUrl: 'views/style-guide.html'
        });
        $routeProvider.otherwise({ redirectTo: '/404' });
    });

require(['services/theme-service'], () => {
    app.run(($rootScope, ThemeService) => {
        $rootScope.changeTheme = () => ThemeService.toggleTheme('high-contrast');
    })
});

export = app;