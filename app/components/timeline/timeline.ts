import app = require('app');
import Helpers = require('utils/helpers');
import Resource = require('models/resource');

import GenericResource = require('components/resource/generic/generic-resource');
import LinkResource = require('components/resource/link/link-resource');
import ImageResource = require('components/resource/image/image-resource');
import VideoResource = require('components/resource/video/video-resource');
import PDFResource = require('components/resource/pdf/pdf-resource');
import FormResource = require('components/resource/form/form-resource');
var imported = [GenericResource, LinkResource, ImageResource, VideoResource, PDFResource, FormResource];

interface IScope extends ng.IScope {
    label: string
    readOnly: boolean
    scrollPaused: boolean
    sections : ISection[]
    fullListOfItems : Resource[]
    fetchNextItems : () => void
    removeItem : (id) => void
}

export interface ISection {
    label : string
    date : Date
    items : Resource[]
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
                    if ((<HTMLElement>breakpoints[i]).offsetTop < window.pageYOffset + 30) {
                        label = breakpoints[i].textContent;
                    } else {
                        break;
                    }
                }
                if (label !== $scope.label) {
                    $scope.label = label;
                    $scope.$apply();
                }
            });
        }
    }
}

function TimelineController ($scope : IScope) {
    var itemsLoaded;

    $scope.label = 'Most Recent Posts';
    $scope.sections = [];
    $scope.scrollPaused = true;

    $scope.$watchCollection('fullListOfItems', (newItems : Resource[], oldItems  : Resource[]) => {
        if ($scope.sections.length === 0) {
            if ($scope.fullListOfItems.length > 0) {
                itemsLoaded = 0;
                $scope.sections = [{
                    label: "Today's " + Date.today().toFormat("DD MMMM"),
                    date: Date.today(),
                    items: []
                }];
                $scope.fetchNextItems();
            }
        } else {
            var itemDiff = Helpers.getDiff(newItems, oldItems);
            itemDiff.added.forEach((x) => addItem(x));
            itemDiff.removed.forEach((x) => removeItem(x));
        }
    });

    function addItem(item : Resource) {
        itemsLoaded++;
        for (var i = 0; i < $scope.sections.length; i++) {
            var section = $scope.sections[i];
            if(Date.equalsDay(section.date, item.dateCreated)) {
                $scope.sections[i].items.push(item);
                return;
            }
        }

        $scope.sections.push({
            label: item.dateCreated.toFormat("DDDD DD MMMM"),
            date: item.dateCreated.clearTime(),
            items: [item]
        });
    }

    function removeItem(item : Resource) {
        itemsLoaded--;
        for (var i = 0; i < $scope.sections.length; i++) {
            var section = $scope.sections[i];
            if(Date.equalsDay(section.date, item.dateCreated)) {
                for (var j = 0; j < section.items.length; j++) {
                    var item = section.items[j];
                    if(item.id === item.id) {
                        section.items.splice(j, 1);
                        return;
                    }
                }
            }
        }
    }

    $scope.fetchNextItems = () => {
        $scope.scrollPaused = true;
        var items = itemsLoaded + Math.min($scope.fullListOfItems.length - itemsLoaded, 6);
        for (var i = itemsLoaded; i < items; i++) {
            addItem($scope.fullListOfItems[i]);
        }
        $scope.scrollPaused = $scope.fullListOfItems.length <= itemsLoaded;
    };

    $scope.removeItem = (id) => {
        for (var i = 0; i < $scope.fullListOfItems.length; i++) {
            if($scope.fullListOfItems[i].id === id) {
                $scope.fullListOfItems.splice(i, 1);
                return;
            }
        }
    };
}

app.directive('timeline', Timeline);