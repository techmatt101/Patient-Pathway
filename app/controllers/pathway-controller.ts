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
    results : any[]
    search : (text : string) => void
}

function PathwayController ($scope : IScope, MediaService : MediaService) {
    $scope.results = [];
    $scope.search = (text) => {
        MediaService.search(text).then((data : any) => {
            $scope.results = data;
        });
    };
}

app.controller('PathwayController', PathwayController);

export = PathwayController;