import app = require('app');

interface IResponse {
    success : boolean
    token? : string
    timestamp? : number
    response? : any
    error? : IResponseError
}

interface IResponseError {
    type : string
    message : string
}

class BackendConnectionService {
    private _Promise : ng.IQService;
    private _request : ng.IHttpService;

    private _url = 'http://1d7699839159eb08ad51551d01fd6873.wp.patientpath.co.uk/';
    private _token = '6b1adee9b2bd36fe115b70332ba50d9b7f5449e7';


    constructor($q, $http) {
        this._Promise = $q;
        this._request = $http;
    }

    get(path, data? : Object) : ng.IPromise<any> {
        return new this._Promise((resolve, reject) => {
            //this._request.post(this._url + path, {
            //    "args": data,
            //    "token": this._token,
            //    "timestamp": Date.now()
            //})
            this._request.get('mock-data/' + path + '.json')
                .success((data : IResponse) => {
                    (data.success) ? resolve(data.response) : reject(data.error);
                })
                .error(reject);
        });
    }
}

app.service('BackendConnectionService', BackendConnectionService);

export = BackendConnectionService;