import app = require('app');
import Permissions = require('types/permissions');
import UserService = require('services/user-service');
import PathwayService = require('services/pathway-service');
import Navbar = require('components/navbar/navbar');
var imported = [UserService, PathwayService, Navbar]; //TODO: HACK!!!

interface IScope extends ng.IScope {
    name : string
    email : string
    password : string
    accountType : string
    btnText : string
    submit : () => void
}

function SettingsController($scope : IScope, UserService : UserService) {
    $scope.name = UserService.User.name;
    $scope.email = UserService.User.email;
    $scope.accountType = Permissions[UserService.User.permissionLevel];

    $scope.btnText = 'Update';

    $scope.submit = () => {
        $scope.btnText = 'Updating...';
        UserService.update({ name: $scope.name, email: $scope.email })
            .then(() => {
                $scope.btnText = 'Updated';
                $scope.password = '';
            });
    }
}

app.controller('SettingsController', SettingsController);

export = SettingsController;