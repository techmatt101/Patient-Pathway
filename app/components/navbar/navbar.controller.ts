module Navbar {

    interface IScope extends ng.IScope {
        date: Date
    }

    export class Main {
        constructor ($scope : IScope) {
            $scope.date = new Date();
        }
    }
}

export = Navbar;