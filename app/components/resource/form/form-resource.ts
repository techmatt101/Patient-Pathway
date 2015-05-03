import app = require('app');

export function FormResource () {
    return {
        templateUrl: 'components/resource/form/form-resource.html',
        scope: {
            resource: '=resource',
        }
    }
}

app.directive('formResource', FormResource);