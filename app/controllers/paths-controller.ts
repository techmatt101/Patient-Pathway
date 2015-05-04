import app = require('app');
import User = require('models/user');
import UserService = require('services/user-service');
import PathwayService = require('services/pathway-service');
import Navbar = require('components/navbar/navbar');
var imported = [UserService, PathwayService, Navbar]; //TODO: HACK!!!

interface IScope extends ng.IScope {
    users : User[]
    newPathway : () => void
}

function PathsController ($scope : IScope, $location : ng.ILocationService, PathwayService : PathwayService, UserService : UserService) {
    $scope.users = [];
    PathwayService.list(UserService.User.id)
        .then((data) => {
            $scope.users = data;
        });

    $scope.newPathway = () => {
        $location.path('/pathway/1')
    };
}

app.controller('PathsController', PathsController);

export = PathsController;