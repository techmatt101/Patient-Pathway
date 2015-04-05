import app = require('app');
import Helpers = require('utils/helpers');
import BackendConnectionService = require('./backend-connection-service');
var imported = [BackendConnectionService]; //TODO: HACK!!!


class PathwayService {
    private _Promise : ng.IQService;
    private _request : BackendConnectionService;


    constructor ($q, BackendConnectionService) {
        this._Promise = $q;
        this._request = BackendConnectionService;
    }


    create (title : number, themeId = 1) {
        return this._request.get('pathway/create', {
            title: title,
            themeId: themeId
        });
    }

    remove (pathwayId : number) {
        return this._request.get('pathway/delete', {
            id: [pathwayId]
        });
    }

    list (userId : number) {
        return this._request.get('user/pathways', {
            id: [userId]
        }).then(function(data : any) {
            return Helpers.tableToArray(data.users['1'].pathways);
        });
    }

    info (pathwayIds : number[]) {
        return this._request.get('pathway/info', {
            ids: pathwayIds
        });
    }

    update (pathwayId : number, title : string, description : string, themeId : number) {
        return this._request.get('pathway/update', {
            id: pathwayId,
            title: title,
            description: description,
            themeId: themeId
        });
    }
}

app.service('PathwayService', PathwayService);

export = PathwayService;