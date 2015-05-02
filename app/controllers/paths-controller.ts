import app = require('app');
import UserService = require('../services/user-service');
import PathwayService = require('../services/pathway-service');
import Navbar = require('../components/navbar/navbar');
var imported = [UserService, PathwayService, Navbar]; //TODO: HACK!!!

interface IScope extends ng.IScope {
    users : IUser[]
}

interface IUser {
    id : number
    name : string
    pathways : IPath[]
}

interface IPath {
    id : number
    name : string
    themeId : number
    users : IUser[]
    url : string
}

function PathsController ($scope : IScope, PathwayService: PathwayService) {
    $scope.users = [];
    PathwayService.list(1).then((data) => {
        $scope.users = data;
        $scope.users.forEach((user : any) => {
            user.pathways = user.pathways.map((x : any) => {
                x.url = '#/pathway/' + x.id;
                return x;
            });
        });
    });
}

app.controller('PathsController', PathsController);

export = PathsController;