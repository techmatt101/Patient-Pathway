import app = require('app');

interface IScope {
    showMenu : boolean;
}

function Navbar($scope : IScope) {
    $scope.showMenu = false;
}

app.controller('Navbar', Navbar);

export = Navbar;