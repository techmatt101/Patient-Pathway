import app = require('app');
import Resource = require('models/resource');

interface IScope {
    resource: Resource
    openImage: () => void
}

export function ImageResource () {
    return {
        templateUrl: 'components/resource/image/image-resource.html',
        scope: {
            resource: '=resource',
        },
        controller: ($scope : IScope, ngDialog) => {
            $scope.openImage = () => {
                ngDialog.open({
                    className: 'modal',
                    template: 'components/resource/image/lightbox-image.html',
                    scope: $scope
                });
            };
        }
    }
}

app.directive('imageResource', ImageResource);