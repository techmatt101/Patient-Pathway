import app = require('app');
import User = require('models/user');
import Notification = require('models/notification');
import Permissions = require('types/permissions');
import BackendConnectionService = require('./backend-connection-service');
var imported = [BackendConnectionService]; //TODO: HACK!!!

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


    constructor($q, $cookieStore, BackendConnectionService) {
        this._Promise = $q;
        this._request = BackendConnectionService;
        this._session = $cookieStore;

        this.generateGuestUser();
    }

    private generateGuestUser() {
        this.User = {
            id: 0,
            name : 'Guest',
            email: '',
            permissionLevel: Permissions.GUEST
        };
    }

    checkSession() {
        var data = this._session.get('user');
        if(data) {
            this.User = JSON.parse(data);
        }
    }

    getEmail() : string {
        return this._session.get('email');
    }

    login (email : string, password : string) : ng.IPromise<User> {
        if(email.indexOf('error') !== -1) return this._Promise.reject(); //TODO: for demo purposes only!
        return this._request.get('user/login', {
            email: email,
            password: password
        }).then((data) => {
            this._session.put('email', data.email);
            this._session.put('user', JSON.stringify(data));

            this.User.name = data.name; //TODO: move to a mapper!!
            this.User.email = data.email;
            this.User.permissionLevel = data.permissionLevel;

            return data;
        });
    }

    logout () : ng.IPromise<void> {
        this._session.put('user', null);
        this.generateGuestUser();
        return this._request.get('user/logout');
    }

    info (userIds : number[]) : ng.IPromise<User> {
        return this._request.get('user/info', {
            ids: userIds
        });
    }

    updatePassword (oldPassword : string, newPassword : string) : ng.IPromise<void> {
        return this._request.get('user/update-password', {
            oldPassword: oldPassword,
            newPassword: newPassword
        });
    }

    resetPassword (email : string) : ng.IPromise<void> {
        return this._request.get('user/reset-password', {
            email: email
        });
    }

    notifications () : ng.IPromise<Notification[]> {
        return this._request.getFromMockData('user/notifications')
            .then((data) => data.notifications);
    }
}

app.service('UserService', UserService);

export = UserService;