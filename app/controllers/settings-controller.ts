import app = require('app');
import UserService = require('../services/user-service');
import PathwayService = require('../services/pathway-service');
import Navbar = require('../components/navbar/navbar');
var imported = [UserService, PathwayService, Navbar]; //TODO: HACK!!!

interface IScope {
    name : string
    email : string
    password : string
}

function SettingsController($scope : IScope, UserService : UserService) {
    $scope.name = UserService.User.name;
    $scope.email = UserService.User.email;
}

app.controller('SettingsController', SettingsController);

export = SettingsController;