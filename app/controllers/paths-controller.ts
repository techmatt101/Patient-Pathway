import app = require('app');
import User = require('models/user');
import Permissions = require('types/permissions');
import UserService = require('services/user-service');
import PathwayService = require('services/pathway-service');
import Navbar = require('components/navbar/navbar');
var imported = [UserService, PathwayService, Navbar]; //TODO: HACK!!!

interface IScope extends ng.IScope {
    users : User[]
    newPathway : () => void
    readOnly : boolean
}

function PathsController ($scope : IScope, $location : ng.ILocationService, PathwayService : PathwayService, UserService : UserService) {
    $scope.readOnly = UserService.User.permissionLevel < Permissions.CLINICIAN;
    $scope.users = [];
    PathwayService.list(UserService.User.id)
        .then((data) => {
            $scope.users = data;
        });

    $scope.newPathway = () => {
        PathwayService.create('New pathway')
            .then((pathway) => {
                $location.path(pathway.url);
            });
    };
}

app.controller('PathsController', PathsController);

export = PathsController;