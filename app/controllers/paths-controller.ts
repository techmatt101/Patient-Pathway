import PathwayService = require('../services/pathway-service');

interface IScope extends ng.IScope {
    paths : IPath[]
}

interface IPath {
    id : number
    name : string
    themeId : number
    users : IUser[]
}

interface IUser {
    id : number
    name : string
}

// @ngInject
function PathsControler ($scope : IScope, PathwayService: PathwayService) {
    $scope.paths = [];
    PathwayService.list(1).then((data) => {
        $scope.paths = data;
    });
}

export = PathsControler;