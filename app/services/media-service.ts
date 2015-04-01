import app = require('app');
import Helpers = require('../utils/helpers');
import BackendConnectionService = require('./backend-connection-service');
var imported = [BackendConnectionService]; //TODO: HACK!!!

enum MediaTypes {
    VIDEO,
    IMAGE,
    PDF,
    LINK
}

class MediaService {
    private _Promise : ng.IQService;
    private _request : BackendConnectionService;


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

    search (query : string, tags? : string, type? : string, page? : number, results? : number) {
        return this._request.get('media/search', {
            title: query
        }).then((data : any) => {
            return Helpers.tableToArray(data.media);
        });
    }
}

app.service('MediaService', MediaService);

export = MediaService;