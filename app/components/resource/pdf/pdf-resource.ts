import app = require('app');

export function PDFResource () {
    return {
        templateUrl: 'components/resource/pdf/pdf-resource.html',
        scope: {
            resource: '=resource',
        }
    }
}

app.directive('pdfResource', PDFResource);