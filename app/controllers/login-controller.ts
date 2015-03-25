import UserService = require('../services/user-service');

interface IScope extends ng.IScope {
    username : string
    password : string
    submit : () => void
}

function LoginController($scope : IScope, $location : ng.ILocationService, UserService : UserService, $http) {
    $scope.username = '';
    $scope.password = '';
    $scope.submit = () => {
        UserService.login($scope.username, $scope.password).then((data) => {
            console.log(data);
            $location.path('/paths');
        });
    };
}

export = LoginController;