class PathwayService {
    private _http : ng.IHttpService;

    // @ngInject
    constructor($http) {
        this._http = $http;
    }


    create (title : number, themeId = 1, templateId? : number) {
        return this._http.get(this.pathwayPath('create'))
            .then(function(result) {
                return result.data;
            });
    }

    remove (pathwayId : number) {
        return this._http.get(this.pathwayPath('delete'))
            .then(function(result) {
                return result.data;
            });
    }

    list (userId : number) {
        return this._http.get(this.userPath('/pathways'))
            .then(function(result) {
                var pathwayTable = (<any>result.data).users['1'].pathways;
                var pathways = [];
                for(var key in pathwayTable) {
                    pathways.push(pathwayTable[key]);
                }
                return pathways;
            })
    }

    info (pathwayIds : number[]) {
        return this._http.get(this.pathwayPath('info'))
            .then(function(result) {
                return result.data;
            })
    }

    update (pathwayId : number, title : string, description : string, themeId : number) {
        return this._http.get(this.pathwayPath('update'))
            .then(function(result) {
                return result.data;
            });
    }

    private pathwayPath (path) { //TODO: need to be static in a better location
        return 'mock-data/pathway/' + path + '.json';
    }

    private userPath (path) { //TODO: need to be static in a better location
        return 'mock-data/user/' + path + '.json';
    }
}

export = PathwayService;