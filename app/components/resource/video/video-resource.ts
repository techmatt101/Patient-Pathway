import app = require('app');

export function VideoResource () {
    return {
        templateUrl: 'components/resource/video/video-resource.html',
        scope: {
            resource: '=resource',
        },
        controller: ($scope, $sce : ng.ISCEService) => {
            $scope.resource.url = $sce.trustAsResourceUrl($scope.resource.url + '?autoplay=1');
        }
    }
}

app.directive('videoResource', VideoResource);