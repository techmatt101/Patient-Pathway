/// <reference path="../../typings/tsd.d.ts" />

module Paths {

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

    export class Main {
        constructor ($scope : IScope) {
            $scope.paths = [
                {
                    id: 101,
                    name: 'Nexus S',
                    themeId: 2,
                    users: []
                },
                {
                    id: 102,
                    name: 'Nexus X',
                    themeId: 2,
                    users: []
                },
                {
                    id: 103,
                    name: 'Nexus L',
                    themeId: 2,
                    users: []
                }
            ];
        }
    }
}

export = Paths;