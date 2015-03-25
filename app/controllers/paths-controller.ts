interface IScope extends ng.IScope {
    paths : IPath[]
}

interface IPath {
    id : number
    name : string
    themeId : number
    users : IUser[]
}

interface IUser {
    id : number
    name : string
}

function PathsControler ($scope : IScope) {
    $scope.paths = [
        {
            id: 101,
            name: "James's Path",
            themeId: 2,
            users: []
        },
        {
            id: 102,
            name: "Jim's Path",
            themeId: 2,
            users: []
        },
        {
            id: 103,
            name: "Jess's Path",
            themeId: 2,
            users: []
        }
    ];
}

export = PathsControler;