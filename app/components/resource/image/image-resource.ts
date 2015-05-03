import app = require('app');

export function ImageResource () {
    return {
        templateUrl: 'components/resource/image/image-resource.html',
        scope: {
            resource: '=resource',
        }
    }
}

app.directive('imageResource', ImageResource);