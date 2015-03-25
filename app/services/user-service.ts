class UserService {
    private _http : ng.IHttpService;

    constructor($http) {
        this._http = $http;
    }


    login (email : string, password : string) {
        return this._http.get(this.userPath('login'))
            .then(function(result) {
                return result.data;
            });
    }

    logout () {
        return this._http.get(this.userPath('logout'))
            .then(function(result) {
                return result.data;
            });
    }

    info (userIds : number[]) {
        return this._http.get(this.userPath('info'))
            .then(function(result) {
                return result.data;
            });
    }

    updatePassword (oldPassword : string, newPassword : string) {
        return this._http.get(this.userPath('update-password'))
            .then(function(result) {
                return result.data;
            });
    }

    resetPassword (email : string) {
        return this._http.get(this.userPath('reset-password'))
            .then(function(result) {
                return result.data;
            });
    }

    private userPath (path) { //TODO: need to be static in a better location
        return 'mock-data/user/' + path + '.json';
    }
}

export = UserService;