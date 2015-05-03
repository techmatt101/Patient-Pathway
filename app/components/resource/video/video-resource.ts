import app = require('app');

export function VideoResource () {
    return {
        templateUrl: 'components/resource/video/video-resource.html',
        scope: {
            resource: '=resource',
        }
    }
}

app.directive('videoResource', VideoResource);