import app = require('app');

export function LinkResource () {
    return {
        templateUrl: 'components/resource/link/link-resource.html',
        scope: {
            resource: '=resource',
        }
    }
}

app.directive('linkResource', LinkResource);