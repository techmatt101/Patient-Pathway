import app = require('app');

interface IScope extends ng.IScope {
    items : ITeam[]
}

export interface ITeam {
    id : number
    title : string
    type : string
    notes : string
    thumbnail : string
}

export function Timeline() {
    return {
        templateUrl: 'components/timeline/timeline.html',
        controller: TimelineController,
        scope: {
            items: '=items'
        }
    }
}

function TimelineController ($scope : IScope) {
    $scope.items = [];
}

app.directive('timeline', Timeline);