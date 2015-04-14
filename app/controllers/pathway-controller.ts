import app = require('app');
import UserService = require('../services/user-service');
import PathwayService = require('../services/pathway-service');
import PointService = require('../services/point-service');
import MediaService = require('../services/media-service');
import Navbar = require('../components/navbar/navbar');
import SearchBar = require('../components/search-bar/search-bar');
import Timeline = require('../components/timeline/timeline');
import Settings = require('./settings-controller');
var imported = [UserService, PathwayService, PointService, MediaService, Navbar, SearchBar, Timeline, Settings]; //TODO: HACK!!!

interface IScope extends ng.IScope {
    mediaResults : any[]
    searchMedia : (query : string) => void
    points : Timeline.IItem[]
    addPoint : (mediaId : number) => void
    openSettings : () => void
}

function PathwayController ($scope : IScope, $rootScope, btfModal : any, PathwayService : PathwayService, PointService : PointService, MediaService : MediaService) {
    PathwayService.info([1]).then((data) => {
        $rootScope.title = data.pathways[1].title; //TODO: needs to be fetched from cache
    });

    $scope.openSettings = () => { //TODO: temporary example
        btfModal({
            controller: 'SettingsController',
            templateUrl: 'views/settings.html'
        }).activate();
    };

    // Search Bar
    $scope.mediaResults = [];
    $scope.searchMedia = (query) => {
        MediaService.search(query).then((data : any) => {
            $scope.mediaResults = data;
        });
    };

    // Timeline
    $scope.points = [];
    $scope.addPoint = (mediaId) => {
        console.log(mediaId);
        PointService.add(1, mediaId, 0).then(() => { //TODO: linkup pathway id and last point id
            $scope.points.unshift({
                "id": mediaId,
                "type": "link",
                "title": "Example title " + mediaId,
                "thumbnail": "http://placekitten.com/g/300/150",
                "notes": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque metus massa, pellentesque sit amet lectus eu, aliquam commodo lacus. In hac habitasse platea dictumst.",
                "mediaId": 3,
                "nextPointId": null,
                "date": new Date(),
                "timestamp": Date.now(),
                "previousPointId": 2
            });
            (<any>document.querySelector('timeline > ul > li:nth-child(1) > ul > li:last-child')).scrollIntoView();
        });
    };

    function fetchPoints () {
        PointService.list(1).then((data) => {
            $scope.points = data;
        });
    }

    fetchPoints();
}

app.controller('PathwayController', PathwayController);

export = PathwayController;