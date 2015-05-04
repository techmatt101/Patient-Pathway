import app = require('app');

import User = require('models/user');
import Media = require('models/media');
import MediaMapper = require('mappers/media-mapper');
import Resource = require('models/resource');
import Permissions = require('types/permissions');

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
    readOnly : boolean
    openSettings : () => void
    User : User
    Permissions : any

}

function PathwayController ($scope : IScope, $rootScope, $routeParams, ngDialog, PathwayService : PathwayService, MediaService : MediaService, UserService : UserService) {
    $scope.mediaResults = [];
    $scope.points = [];
    $scope.readOnly = UserService.User.permissionLevel < Permissions.CLINICIAN;

    PathwayService.info([$routeParams.id])
        .then((pathways) => {
            $scope.pathway = pathways[0];
            $rootScope.title = $scope.pathway.title;
        })
        .then(() => {
            PathwayService.listResources($scope.pathway.id)
                .then((data) => {
                    $scope.points = data;
                });
        });

    if($scope.readOnly) return;

    // Menu
    $scope.menuItems = [
        {
            text: 'Assign Patient to Pathway',
            action: () => {
                ngDialog.open({
                    className: 'modal',
                    template: 'views/assign-user-pathway.html'
                });
            }
        },
        {
            text: 'Pathway Settings',
            action: () => {
                ngDialog.open({
                    className: 'modal',
                    template: 'views/pathway-settings.html'
                });
            }
        }
    ];


    // Search Bar
    $scope.searchMedia = (query) => {
        MediaService.search(query).then((medias) => {
            $scope.mediaResults = medias.map((x) => MediaMapper.mapMediaToSearchItem(x));
        });
    };


    // Timeline
    $scope.addPoint = (mediaId) => {
        PathwayService.addResource($scope.pathway.id, mediaId, 0)
            .then((resource) => {
                $scope.points.unshift(resource);
                window.scroll(0, 0);
            });
    };
}

app.controller('PathwayController', PathwayController);

export = PathwayController;