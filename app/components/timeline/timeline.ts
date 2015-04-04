import app = require('app');

interface IScope extends ng.IScope {
    scrollPaused: boolean
    items : ITeam[]
    fullListOfItems : ITeam[]
    fetchNextItems : () => void
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
            fullListOfItems: '=items'
        }
    }
}

function TimelineController ($scope : IScope) {
    $scope.items = [];
    $scope.scrollPaused = false;
    $scope.fetchNextItems = () => {
        var length = $scope.items.length + Math.min($scope.fullListOfItems.length - $scope.items.length, 6);
        for(var i = $scope.items.length; i < length; i++) {
            $scope.items.push($scope.fullListOfItems[i]);
        }
        if($scope.fullListOfItems.length <= length) $scope.scrollPaused = true;
    };
}

app.directive('timeline', Timeline);