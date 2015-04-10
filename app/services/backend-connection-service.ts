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
    private _token = '';
    private _timestamp = 0;


    constructor ($q, $http) {
        this._Promise = $q;
        this._request = $http;
    }

    private requestHandler (request : ng.IHttpPromise<any>) : ng.IPromise<any> {
        return new this._Promise((resolve, reject) => {
            request.success((data : IResponse) => {
                if (data.success) {
                    this._token = data.token;
                    this._timestamp = data.timestamp;
                    resolve(data.response);
                } else {
                    reject(data.error);
                }
            });
            request.error(reject);
        });
    }

    private backendRequester (path, data? : Object) : ng.IPromise<any> {
        return this.requestHandler(this._request.get('mock-data/' + path + '.json'));
        //return this._request.post(this._url + path, {
        //    "args": data,
        //    "token": this._token,
        //    "timestamp": this._timestamp
        //});
    }

    get (path, data? : Object) : ng.IPromise<any> {
        //if (new Date(this._timestamp).isBefore(new Date())) {
        //    return new this._Promise((resolve, reject) => {
        //        this.requestHandler(this._request.get(this._url + 'user/token'))
        //            .then(() => this.backendRequester(path, data)
        //                .then((data) => resolve(data))
        //                .catch((data) => reject(data)))
        //            .catch((data) => reject(data));
        //    });
        //}

        return this.backendRequester(path, data);
    }

    getFromMockData (path, data? : Object) : ng.IPromise<any> {
        return this.requestHandler(this._request.get('mock-data/' + path + '.json'));
    }
}

app.service('BackendConnectionService', BackendConnectionService);

export = BackendConnectionService;