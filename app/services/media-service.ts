import app = require('app');
import BackendConnectionService = require('./backend-connection-service');
var imported = [BackendConnectionService]; //TODO: HACK!!!


class MediaService {
    private _Promise : ng.IQService;
    private _request : BackendConnectionService;

    // @ngInject
    constructor ($q, BackendConnectionService) {
        this._Promise = $q;
        this._request = BackendConnectionService;
    }


    info (mediaIds : number[]) {
        return this._request.get('media/info', {
            ids: mediaIds
        });
    }

    listTags () {
        return this._request.get('media/tags');
    }

    search (text : number, tags? : string, type? : string, page? : number, results? : number) {
        return this._request.get('media/search', {
            title: text
        });
    }
}

export = MediaService;