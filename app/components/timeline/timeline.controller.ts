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
            name: "Media 1"
        },
        {
            id: 102,
            name: "Media 2"
        },
        {
            id: 103,
            name: "Media 3"
        }
    ];
}

export = Timeline;