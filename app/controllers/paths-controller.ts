import app = require('app');
import User = require('models/user');
import UserService = require('services/user-service');
import PathwayService = require('services/pathway-service');
import Navbar = require('components/navbar/navbar');
var imported = [UserService, PathwayService, Navbar]; //TODO: HACK!!!

interface IScope extends ng.IScope {
    users : User[]
}

function PathsController ($scope : IScope, PathwayService : PathwayService, UserService : UserService) {
    $scope.users = [];
    PathwayService.list(UserService.User.id)
        .then((data) => {
            $scope.users = data;
        });
}

app.controller('PathsController', PathsController);

export = PathsController;