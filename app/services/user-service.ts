import app = require('app');
import BackendConnectionService = require('./backend-connection-service');
var imported = [BackendConnectionService]; //TODO: HACK!!!


enum Permissions {
    NONE,
    ADMIN
}

interface IUserDetails {
    id : number
    name : string
    email : string
    permissionLevel : Permissions
}

class UserService {
    private _Promise : ng.IQService;
    private _request : BackendConnectionService;
    private _session : angular.cookies.ICookieStoreService;

    public User : IUserDetails;

    // @ngInject
    constructor($q, $cookieStore, BackendConnectionService) {
        this._Promise = $q;
        this._request = BackendConnectionService;
        this._session = $cookieStore;
    }

    getEmail() : string {
        return this._session.get('email');
    }

    login (email : string, password : string) {
        var self = this;
        return this._request.get('user/login', {
            email: email,
            password: password
        }).then((data) => {
            self._session.put('email', data.email);
            self.User = data;
            return data;
        });
    }

    logout () {
        return this._request.get('user/logout');
    }

    info (userIds : number[]) {
        return this._request.get('user/info', {
            ids: userIds
        });
    }

    updatePassword (oldPassword : string, newPassword : string) {
        return this._request.get('user/update-password', {
            oldPassword: oldPassword,
            newPassword: newPassword
        });
    }

    resetPassword (email : string) {
        return this._request.get('user/reset-password', {
            email: email
        });
    }
}

app.service('UserService', UserService);

export = UserService;