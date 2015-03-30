import app = require('app');

interface IScope extends ng.IScope {
    items : ITeam[]
}

interface ITeam {
    id : number
    name : string
}

function Timeline ($scope : IScope) {
    $scope.items = [
        {
            id: 101,
            name: "Point 1"
        },
        {
            id: 102,
            name: "Point 2"
        },
        {
            id: 103,
            name: "Point 3"
        }
    ];
}

app.controller('Timeline', Timeline);

export = Timeline;