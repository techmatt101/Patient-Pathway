import app = require('app');
import UserService = require('../services/user-service');
var imported = [UserService]; //TODO: HACK!!!

interface IScope extends ng.IScope {
    email : string
    password : string
    submit : () => void
}

// @ngInject
function LoginController ($scope : IScope, $location : ng.ILocationService, UserService : UserService) {
    $scope.email = UserService.getEmail();
    $scope.password = '';
    $scope.submit = () => {
        UserService.login($scope.email, $scope.password)
            .then((data) => {
                console.log(data);
                $location.path('/paths');
            })
            .catch(() => {
                alert("Login FAILED");
            });
    };
}

app.controller('LoginController', LoginController);

export = LoginController;