import app = require('app');
import UserService = require('../services/user-service');
import PathwayService = require('../services/pathway-service');
import PointService = require('../services/point-service');
import MediaService = require('../services/media-service');
import Navbar = require('../components/navbar/navbar');
import SearchBar = require('../components/search-bar/search-bar');
import Timeline = require('../components/timeline/timeline');
var imported = [UserService, PathwayService, PointService, MediaService, Navbar, SearchBar, Timeline]; //TODO: HACK!!!

interface IScope extends ng.IScope {
    mediaResults : any[]
    searchMedia : (query : string) => void
    points : Timeline.ITeam[]
    addPoint : (mediaId : number) => void
}

function PathwayController ($scope : IScope, PointService : PointService, MediaService : MediaService) {
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
        PointService.add(1, mediaId, 0).then(() => { //TODO: linkup pathway id and last point id
            fetchPoints();
            console.log("YAY ADDED POINT!");
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