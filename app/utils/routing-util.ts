module RoutingUtil {
    export interface IRoute {
        name : string
        path : string
        controller : string
        view : string
        resolve? : any
    }

    export function registerRoutes (routes : IRoute[], $routeProvider : ng.route.IRouteProvider) {
        routes.forEach((route) => registerRoute(route, $routeProvider));
    }

    export function registerRoute (route : IRoute, $routeProvider : ng.route.IRouteProvider) {
        // @ngInject
        var dependencies = ($q, $rootScope) => {
            var deferred = $q.defer();
            require([route.controller], () => $rootScope.$apply(() => deferred.resolve()));
            return deferred.promise;
        };
        var config = {
            templateUrl: route.view,
            controller: route.name,
            resolve: (route.resolve) ? route.resolve : {}
        };
        config.resolve.dependencies = dependencies;
        $routeProvider.when(route.path, config);
    }
}

export = RoutingUtil;