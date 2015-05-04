import app = require('app');

import Media = require('models/media');
import MediaMapper = require('mappers/media-mapper');
import Resource = require('models/resource');

import UserService = require('services/user-service');
import PathwayService = require('services/pathway-service');
import MediaService = require('services/media-service');

import Navbar = require('components/navbar/navbar');
import SearchBar = require('components/search-bar/search-bar');
import Timeline = require('components/timeline/timeline');

var imported = [UserService, PathwayService, MediaService, Navbar, SearchBar, Timeline]; //TODO: HACK!!!


interface IScope extends ng.IScope {
    pathway: any
    menuItems: Navbar.IMenuItem[]
    mediaResults : SearchBar.IItem[]
    searchMedia : (query : string) => void
    points : Resource[]
    addPoint : (mediaId : number) => void
    readOnlyTimeline : boolean
    openSettings : () => void
}

function PathwayController ($scope : IScope, $rootScope, $routeParams, PathwayService : PathwayService, MediaService : MediaService) {
    PathwayService.info([$routeParams.id])
        .then((pathways) => {
            $scope.pathway = pathways[$routeParams.id];
            $rootScope.title = $scope.pathway.title;
        })
        .then(() => {
            PathwayService.listResources($scope.pathway.id)
                .then((data) => {
                    $scope.points = data;
                });
        });


    // Menu
    $scope.menuItems = [{
        text: 'Assign Patient to Pathway',
        href: '/404'
    }];

    //$scope.openSettings = () => { //TODO: temporary example
    //    btfModal({
    //        controller: 'SettingsController',
    //        templateUrl: 'views/settings.html'
    //    }).activate();
    //};


    // Search Bar
    $scope.mediaResults = [];
    $scope.searchMedia = (query) => {
        MediaService.search(query).then((medias) => {
            $scope.mediaResults = medias.map((x) => MediaMapper.mapMediaToSearchItem(x));
        });
    };


    // Timeline
    $scope.points = [];
    $scope.addPoint = (mediaId) => {
        PathwayService.addResource($scope.pathway.id, mediaId, 0)
            .then((resource) => {
                $scope.points.unshift(resource);
                window.scroll(0,0);
            });
    };
}

app.controller('PathwayController', PathwayController);

export = PathwayController;