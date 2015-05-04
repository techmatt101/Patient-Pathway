import app = require('app');
import Helpers = require('utils/helpers');
import Media = require('models/Media');
import MediaMapper = require('mappers/media-mapper');
import BackendConnectionService = require('./backend-connection-service');
var imported = [BackendConnectionService]; //TODO: HACK!!!

class MediaService {
    private _Promise : ng.IQService;
    private _request : BackendConnectionService;


    constructor ($q, BackendConnectionService) {
        this._Promise = $q;
        this._request = BackendConnectionService;
    }

    list () : ng.IPromise<Media[]> {
        return this._request.get('media/list')
            .then((data) => Helpers.tableToArray(data.media).map((x) => MediaMapper.mapResponseToMedia(x)));
    }

    search (query : string, tags? : string, type? : string, page? : number, results? : number) : ng.IPromise<Media[]> {
        return this._request.get('media/search', { title: query })
            .then((data) => Helpers.tableToArray(data.media).map((x) => MediaMapper.mapResponseToMedia(x)));
    }

    update (id : number) : ng.IPromise<void> {
        return this._request.get('media/update', { id: id });
    }

    remove (id : number) : ng.IPromise<void> {
        return this._request.get('media/remove', { id: id });
    }
}

app.service('MediaService', MediaService);

export = MediaService;