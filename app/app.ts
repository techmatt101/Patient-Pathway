/// <reference path="../typings/tsd.d.ts" />
declare
var require : any;
import angular = require('angular');

function asyncLoadController (path) { //TODO: hmmm.. better way to do this?
    return ($scope) => {
        require([path], (controller) => {
            new controller.Main($scope);
            $scope.$apply();
        });
    };
}

module PatientPathway {
    angular.module('PatientPathway', [
        'ngRoute',
        'PatientPathway.Login',
        'PatientPathway.Settings',
        'PatientPathway.Paths',
        'PatientPathway.Pathway'
    ])
        .controller('Navbar', asyncLoadController('components/navbar/navbar.controller'))
        .config(($routeProvider : ng.route.IRouteProvider) => {
            $routeProvider.when('/style-guide', {
                templateUrl: 'views/style-guide.html'
            });
            $routeProvider.otherwise({redirectTo: '/login'});
        });

    angular.module('PatientPathway.Login', ['ngRoute'])
        .controller('Login', asyncLoadController('controllers/login'))
        .config(($routeProvider : ng.route.IRouteProvider) => {
            $routeProvider.when('/login', {
                templateUrl: 'views/login.html',
                controller: 'Login'
            });
        });

    angular.module('PatientPathway.Settings', ['ngRoute'])
        .controller('Settings', asyncLoadController('controllers/settings'))
        .config(($routeProvider : ng.route.IRouteProvider) => {
            $routeProvider.when('/settings', {
                templateUrl: 'views/settings.html',
                controller: 'Settings'
            });
        });

    angular.module('PatientPathway.Paths', ['ngRoute'])
        .controller('Paths', asyncLoadController('controllers/paths'))
        .config(($routeProvider : ng.route.IRouteProvider) => {
            $routeProvider.when('/paths', {
                templateUrl: 'views/paths.html',
                controller: 'Paths'
            });
        });

    angular.module('PatientPathway.Pathway', ['ngRoute'])
        .controller('Pathway', asyncLoadController('controllers/pathway'))
        .controller('SearchBar', asyncLoadController('components/search-bar/search-bar.controller'))
        .controller('Timeline', asyncLoadController('components/timeline/timeline.controller'))
        .config(($routeProvider : ng.route.IRouteProvider) => {
            $routeProvider.when('/pathway', {
                templateUrl: 'views/pathway.html',
                controller: 'Pathway'
            });
        });
}