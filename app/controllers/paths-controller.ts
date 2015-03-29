import app = require('app');
import UserService = require('../services/user-service');
import PathwayService = require('../services/pathway-service');
import Navbar = require('../components/navbar/navbar.controller');
var imported = [UserService, PathwayService, Navbar]; //TODO: HACK!!!

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
function PathsController ($scope : IScope, PathwayService: PathwayService) {
    $scope.paths = [];
    PathwayService.list(1).then((data) => {
        $scope.paths = data;
    });
}

app.controller('PathsController', PathsController);

export = PathsController;