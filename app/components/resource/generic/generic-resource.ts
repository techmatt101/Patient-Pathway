import app = require('app');

export function GenericResource () {
    return {
        templateUrl: 'components/resource/generic/generic-resource.html',
        scope: {
            resource: '=resource',
        }
    }
}

app.directive('genericResource', GenericResource);