import app = require('app');

interface IScope extends ng.IScope {
    scrollPaused: boolean
    sections : ISection[]
    fullListOfItems : IItem[]
    fetchNextItems : () => void
}

export interface ISection {
    label : string
    date : Date
    items : IItem[]
}

export interface IItem {
    id : number
    title : string
    type : string
    notes : string
    thumbnail : string
    date : Date
    timestamp : number
}

export function Timeline () {
    return {
        templateUrl: 'components/timeline/timeline.html',
        controller: TimelineController,
        scope: {
            fullListOfItems: '=items'
        }
    }
}

function TimelineController ($scope : IScope) {
    var currentDate = new Date();
    var itemsLoaded = 0;

    $scope.sections = [{
        label: "Today's",
        date: (<any>Date).today(), //TODO: hmmm... need to create a d.ts for date-utils
        items: []
    }];
    $scope.scrollPaused = true;

    $scope.$watch('fullListOfItems', () => {
        if ($scope.fullListOfItems.length > 0) {
            $scope.fetchNextItems();
        }
    });

    $scope.fetchNextItems = () => {
        $scope.scrollPaused = true;
        var items = itemsLoaded + Math.min($scope.fullListOfItems.length - itemsLoaded, 6);
        for (var i = itemsLoaded; i < items; i++) {
            var item = $scope.fullListOfItems[i];
            item.date = new Date(item.timestamp);

            if ((<any>Date).equalsDay(currentDate, item.date)) { //TODO: hmmm... need to create a d.ts for date-utils
                $scope.sections[$scope.sections.length - 1].items.push(item);
            } else {
                currentDate = item.date;
                $scope.sections.push({
                    label: (<any>item.date).toFormat("DDDD DD MMMM"), //TODO: hmmm... need to create a d.ts for date-utils
                    date: (<any>item.date).clearTime(),//TODO: hmmm... need to create a d.ts for date-utils
                    items: [item]
                });
            }
            itemsLoaded++;
        }
        $scope.scrollPaused = $scope.fullListOfItems.length <= itemsLoaded;
    };
}

app.directive('timeline', Timeline);