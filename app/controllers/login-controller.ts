import app = require('app');
import UserService = require('../services/user-service');
var imported = [UserService]; //TODO: HACK!!!

interface IScope extends ng.IScope {
    notice : string
    email : string
    password : string
    submit : () => void
}

function LoginController ($scope : IScope, $location : ng.ILocationService, $animate : any, UserService : UserService) {
    var form = document.getElementById('login');

    $scope.notice = 'Welcome! Please sign in.';
    $scope.email = UserService.getEmail();
    $scope.password = '';
    $scope.submit = () => {
        UserService.login($scope.email, $scope.password)
            .then((data) => {
                $location.path('/paths');
            })
            .catch(() => {
                $scope.notice = 'Your login information was incorrect. Please try again.';
                $animate.addClass(form, 'shake').then(() => $animate.removeClass(form, 'shake'));
            });
    };
}

app.controller('LoginController', LoginController);

export = LoginController;