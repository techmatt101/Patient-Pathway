class PointService {
    private _http : ng.IHttpService;

    // @ngInject
    constructor ($http) {
        this._http = $http;
    }


    add (pathwayId : number, mediaId : number, previousPointId? : number) {
        return this._http.get(this.pointPath('add'))
            .then(function(result) {
                return result.data;
            });
    }

    remove (pointId : number) {
        return this._http.get(this.pointPath('add'))
            .then(function(result) {
                return result.data;
            });
    }

    update (pointId : number, title : string, note : string) {
        return this._http.get(this.pointPath('add'))
            .then(function(result) {
                return result.data;
            });
    }

    list (pathwayId : number) {
        return this._http.get(this.pathwayPath('points'))
            .then(function(result) {
                return result.data;
            });
    }

    private pathwayPath (path) {
        return 'mock-data/pathway/' + path + '.json';
    }

    private pointPath (path) {
        return 'mock-data/point/' + path + '.json';
    }
}

export = PointService;