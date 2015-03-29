interface IResponse {
    success : boolean
    token : string
    timestamp : number
    response : any
}

class BackendConnectionService {
    private _Promise : ng.IQService;
    private _request : ng.IHttpService;

    private _url = 'mock-data/';

    // @ngInject
    constructor($q, $http) {
        this._Promise = $q;
        this._request = $http;
    }

    get(path, data? : Object) : ng.IPromise<any> {
        return new this._Promise((resolve, reject) => {
            this._request.get(this._url + path + '.json')
                .success((data : IResponse) => {
                    (data.success) ? resolve(data.response) : reject();
                })
                .error(reject);
        });
    }
}

export = BackendConnectionService;