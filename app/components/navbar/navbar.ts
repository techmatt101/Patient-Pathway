import app = require('app');
import User = require('models/User');
import Notification = require('models/notification');
import Permissions = require('types/permissions');
import UserService = require('services/user-service');
var imported = [UserService]; //TODO: HACK!!!


interface IScope extends ng.IScope {
    showUserMenu : boolean
    showNotificationsDropdown : boolean
    User : User
    UserPermissions : any
    notifications : Notification[]
    menuItems : IMenuItem[]
    pageMenuItems : IMenuItem[]
}

export interface IMenuItem {
    text : string
    href? : string
    action? : any
}

export function Navbar () {
    return {
        templateUrl: 'components/navbar/navbar.html',
        controller: NavbarController,
        scope: {
            pageMenuItems: '=?menuItems'
        },
        transclude: true
    }
}

function NavbarController ($rootScope, $scope : IScope, UserService : UserService) {
    $scope.showUserMenu = false;
    $scope.showNotificationsDropdown = false;
    $scope.User = UserService.User;
    $scope.UserPermissions = Permissions;
    $scope.menuItems = [];

    $scope.$watch('pageMenuItems', () => {
        var items = $scope.pageMenuItems || [];

        items.push({
            text: 'View pathways',
            href: '/paths'
        });

        if(UserService.User.permissionLevel >= Permissions.TEAM_LEADER) {
            items.push({
                text: 'Manage Media',
                href: '/media-manager'
            });
        }

        items.push({
            text: 'High Contrast Theme',
            action: $rootScope.changeTheme
        });

        items.push({
            text: 'Settings',
            href: '/settings'
        });

        items.push({
            text: 'Logout',
            href: '/logout'
        });

        $scope.menuItems = items;
    });

    UserService.notifications()
        .then((notifications) => {
            $scope.notifications = notifications;
        });
}

app.directive('navbar', Navbar);