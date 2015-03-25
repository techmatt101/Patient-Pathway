class MediaService {
    private _http : ng.IHttpService;

    constructor ($http) {
        this._http = $http;
    }


    info (mediaIds : number[]) {
        return this._http.get(this.mediaPath('info'))
            .then(function(result) {
                return result.data;
            });
    }

    listTags () {
        return this._http.get(this.mediaPath('tags'))
            .then(function(result) {
                return result.data;
            });
    }

    search (text : number, tags? : string, type? : string, page? : number, results? : number) {
        return this._http.get(this.mediaPath('search'))
            .then(function(result) {
                return result.data;
            });
    }

    private mediaPath (path) {
        return 'mock-data/media/' + path + '.json';
    }
}

export = MediaService;