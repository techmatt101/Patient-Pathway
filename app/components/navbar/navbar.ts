declare var UserPermissions;
import app = require('app');
import UserService = require('services/user-service');
var imported = [UserService]; //TODO: HACK!!!


interface IScope {
    showUserMenu : boolean;
    showNotificationsDropdown : boolean;
    User : any;
    UserPermissions : any;
    notifications : INotification[];
}

interface INotification {
    message : string
    date : Date
}

export function Navbar () {
    return {
        templateUrl: 'components/navbar/navbar.html',
        controller: NavbarController,
        scope: {},
        transclude: true
    }
}

function NavbarController ($scope : IScope, UserService : UserService) {
    $scope.showUserMenu = false;
    $scope.showNotificationsDropdown = false;
    $scope.User = UserService.User;
    $scope.UserPermissions = UserPermissions;

    UserService.notifications()
        .then((data) => {
            $scope.notifications = data.notifications;
        });
}

app.directive('navbar', Navbar);
