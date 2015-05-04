import app = require('app');
import User = require('models/user');
import UserMapper = require('mappers/user-mapper');
import Pathway = require('models/pathway');
import PathwayMapper = require('mappers/pathway-mapper');
import Resource = require('models/resource');
import ResourceMapper = require('mappers/resource-mapper');
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


    create (title : number, themeId = 1) : ng.IPromise<Pathway> {
        return this._request.get('pathway/create', {
            title: title,
            themeId: themeId
        }).then((data) => PathwayMapper.mapResponseToPathway(data));
    }

    remove (pathwayId : number) : ng.IPromise<void> {
        return this._request.get('pathway/delete', {
            id: [pathwayId]
        });
    }

    list (userId : number) : ng.IPromise<User[]> {
        return this._request.get('user/pathways', {
            id: [userId]
        }).then((data : any) => Helpers.tableToArray(data.users).map((x) => UserMapper.mapResponseToUser(x)));
    }

    info (pathwayIds : number[]) : ng.IPromise<Pathway[]> {
        return this._request.get('pathway/info', {
            ids: pathwayIds
        }).then((data) => Helpers.tableToArray(data.pathways).map((x) => PathwayMapper.mapResponseToPathway(x)));
    }

    update (pathwayId : number, title : string, description : string, themeId : number) : ng.IPromise<void> {
        return this._request.get('pathway/update', {
            id: pathwayId,
            title: title,
            description: description,
            themeId: themeId
        });
    }

    addResource (pathwayId : number, mediaId : number, previousPointId : number) : ng.IPromise<Resource> {
        return this._request.get('point/add', {
            id: pathwayId,
            mediaId: mediaId,
            previousPointId: previousPointId
        }).then((data) => ResourceMapper.mapResponseToResource(data));
    }

    removeResource (pointId : number) : ng.IPromise<void> {
        return this._request.get('point/remove', {
            ids: [pointId]
        });
    }

    updateResource (pointId : number, title : string, note : string) {
        return this._request.get('point/update', {
            id: pointId,
            title: title,
            note: note
        });
    }

    listResources (pathwayId : number) : ng.IPromise<Resource[]> {
        return this._request.get('pathway/points', {
            id: pathwayId
        }).then((data) => Helpers.tableToArray(data.points).map((x) => ResourceMapper.mapResponseToResource(x)))
    }
}

app.service('PathwayService', PathwayService);

export = PathwayService;