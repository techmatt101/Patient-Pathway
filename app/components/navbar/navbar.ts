import app = require('app');
import UserService = require('services/user-service');
var imported = [UserService]; //TODO: HACK!!!


interface IScope {
    showUserMenu : boolean;
    showNotificationsDropdown : boolean;
    notifications : INotification[];
}

interface INotification {

}

function Navbar ($scope : IScope, UserService : UserService) {
    $scope.showUserMenu = false;
    $scope.showNotificationsDropdown = false;

    UserService.notifications()
        .then((data) => {
            $scope.notifications = data.notifications;
        });
}

app.controller('Navbar', Navbar);

export = Navbar;