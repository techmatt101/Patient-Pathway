import app = require('app');

interface IScope extends ng.IScope {
    label: string
    readOnly: boolean
    scrollPaused: boolean
    sections : ISection[]
    fullListOfItems : IItem[]
    fetchNextItems : () => void
    removeItem : (id) => void
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
    url? : string
}

export function Timeline () {
    return {
        templateUrl: 'components/timeline/timeline.html',
        controller: TimelineController,
        scope: {
            fullListOfItems: '=items',
            readOnly: '=?readOnly'
        },
        link: ($scope : IScope, element : ng.IAugmentedJQuery) => {
            // Update Breakpoint Cover Label
            var breakpoints : NodeList;
            $scope.$watchCollection('sections', () => breakpoints = element[0].querySelectorAll('.timeline__breakpoint'));
            window.addEventListener('scroll', () => {
                var label = $scope.label;
                for (var i = 0; i < breakpoints.length; i++) {
                    if((<HTMLElement>breakpoints[i]).offsetTop < window.pageYOffset + 30) {
                        label = breakpoints[i].textContent;
                    } else break;
                }
                if(label !== $scope.label) {
                    $scope.label = label;
                    $scope.$apply();
                }
            });
        }
    }
}

function TimelineController ($scope : IScope, $sce) {
    var currentDate;
    var itemsLoaded;

    $scope.label = 'Most Recent Posts';
    $scope.sections = [];
    $scope.scrollPaused = true;
    $scope.readOnly = false;

    $scope.$watchCollection('fullListOfItems', () => {
        if ($scope.fullListOfItems.length > 0) {
            currentDate = Date.today();
            itemsLoaded = 0;
            $scope.sections = [{
                label: "Today's " + Date.today().toFormat("DD MMMM"),
                date: Date.today(),
                items: []
            }];
            $scope.fetchNextItems();
        }
    });

    $scope.fetchNextItems = () => {
        if(typeof currentDate === 'undefined') return;
        $scope.scrollPaused = true;
        var items = itemsLoaded + Math.min($scope.fullListOfItems.length - itemsLoaded, 6);
        for (var i = itemsLoaded; i < items; i++) {
            var item = $scope.fullListOfItems[i];
            item.date = new Date(item.timestamp);

            item.url = $sce.trustAsResourceUrl(item.url + '?autoplay=1');

            if (Date.equalsDay(currentDate, item.date)) {
                $scope.sections[$scope.sections.length - 1].items.push(item);
            } else {
                currentDate = item.date;
                $scope.sections.push({
                    label: item.date.toFormat("DDDD DD MMMM"),
                    date: item.date.clearTime(),
                    items: [item]
                });
            }
            itemsLoaded++;
        }
        $scope.scrollPaused = $scope.fullListOfItems.length <= itemsLoaded;
    };

    $scope.removeItem = (id) => {
        alert("Remove Item: " + id);
    };
}

app.directive('timeline', Timeline);