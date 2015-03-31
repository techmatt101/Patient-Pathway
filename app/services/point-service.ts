import app = require('app');
import Helpers = require('../utils/helpers');
import BackendConnectionService = require('./backend-connection-service');
var imported = [BackendConnectionService]; //TODO: HACK!!!


class PointService {
    private _Promise : ng.IQService;
    private _request : BackendConnectionService;


    constructor ($q, BackendConnectionService) {
        this._Promise = $q;
        this._request = BackendConnectionService;
    }


    add (pathwayId : number, mediaId : number, previousPointId : number) {
        return this._request.get('point/add', {
            id: pathwayId,
            mediaId: mediaId,
            previousPointId: previousPointId
        });
    }

    remove (pointId : number) {
        return this._request.get('point/remove', {
            ids: [pointId]
        });
    }

    update (pointId : number, title : string, note : string) {
        return this._request.get('point/update', {
            id: pointId,
            title: title,
            note: note
        });
    }

    list (pathwayId : number) {
        return this._request.get('pathway/points', {
            id: pathwayId
        }).then((data) => {
            return Helpers.tableToArray(data.points);
        });
    }
}

app.service('PointService', PointService);

export = PointService;