module RoutingUtil {
    export interface IRoute {
        name : string
        path : string
        controller : string
        view : string
        resolve? : any
    }

    export function registerRoutes (routes : IRoute[], $routeProvider : ng.route.IRouteProvider, $controllerProvider : ng.IControllerProvider) {
        routes.forEach((route) => registerRoute(route, $routeProvider, $controllerProvider));
    }

    export function registerRoute (route : IRoute, $routeProvider : ng.route.IRouteProvider, $controllerProvider : ng.IControllerProvider) {
        // @ngInject
        var load = ($q) => {
            var deferred = $q.defer();
            require([route.controller], (controller) => {
                $controllerProvider.register(route.name, controller);
                deferred.resolve();
            });
            return deferred.promise;
        };

        var resolve = (route.resolve) ? route.resolve : {};
        resolve.load = load;

        $routeProvider.when(route.path, {
            templateUrl: route.view,
            controller: route.name,
            resolve: resolve
        });
    }

    export function legacyAsyncLoadController (path) { //TODO: remove
        // @ngInject
        var load = ($scope) => {
            require([path], (controller) => {
                controller($scope);
                $scope.$apply();
            });
        };
        return load;
    }
}

export = RoutingUtil;