import app = require('app');

// @ngInject
function Navbar($scope) {
    console.log("Navbar", $scope);
}

app.controller('Navbar', Navbar);

export = Navbar;