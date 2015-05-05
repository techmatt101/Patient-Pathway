import app = require('app');
import Navbar = require('components/navbar/navbar');
import Media = require('models/media');
import MediaService = require('services/media-service');
var imported = [Navbar, MediaService]; //TODO: HACK!!!

interface IScope extends ng.IScope {
    medias : Media[]
    items : Media[]
    newMedia : () => void
    editMedia : (index : number) => void
    deleteMedia : (index : number) => void
    fetchNextItems : () => void
    scrollPaused : boolean
}

function MediaManagerController ($scope : IScope, ngDialog, MediaService : MediaService) {
    var itemsLoaded = 0;
    $scope.medias = [];
    $scope.items = [];
    $scope.scrollPaused = false;

    $scope.newMedia = () => {
        ngDialog.open({
            className: 'modal',
            template: 'views/edit-media.html'
        }).closePromise
            .then((data) => { //TODO: hacky needs refactor
                window.scroll(0, 0);
                itemsLoaded++;
                var newMedia = data.value;
                newMedia.type = 0;
                $scope.items.unshift(newMedia);
                $scope.medias.unshift(newMedia);
            });
    };

    $scope.editMedia = (index) => {
        var media = $scope.medias[index];
        ngDialog.open({
            className: 'modal',
            template: 'views/edit-media.html',
            // @ngInject
            controller: ($scope) => {
                $scope.media = media;
            }
        });
    };

    $scope.deleteMedia = (index) => {
        MediaService.remove($scope.medias[index].id)
            .then(() => {
                itemsLoaded--;
                $scope.medias.splice(index, 1);
                $scope.items.splice(index, 1);
            });
    };

    MediaService.list()
        .then((medias) => {
            $scope.medias = medias;
            $scope.fetchNextItems();
        });

    $scope.fetchNextItems = () => {
        $scope.scrollPaused = true;
        var items = itemsLoaded + Math.min($scope.medias.length - itemsLoaded, 25);
        for (var i = itemsLoaded; i < items; i++) {
            $scope.items.push($scope.medias[i]);
            itemsLoaded++;
        }
        $scope.scrollPaused = $scope.medias.length <= itemsLoaded;
    };
}

app.controller('MediaManagerController', MediaManagerController);

export = MediaManagerController;