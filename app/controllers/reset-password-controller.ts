import app = require('app');
import UserService = require('../services/user-service');
var imported = [UserService]; //TODO: HACK!!!

interface IScope extends ng.IScope {
    email : string
    submit : () => void
}

// @ngInject
function ResetPasswordController ($scope : IScope, UserService : UserService) {
    $scope.email = UserService.getEmail();
    $scope.submit = () => {
        UserService.resetPassword($scope.email)
            .then((data) => {
                console.log(data);
            })
            .catch(() => {
                console.error("Failed!");
            });
    };
}

app.controller('ResetPasswordController', ResetPasswordController);

export = ResetPasswordController;