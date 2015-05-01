import app = require('app');

class ThemeService {
    private static DEFAULT_THEME = 'main';

    private _session : angular.cookies.ICookieStoreService;
    private _currentTheme;


    constructor($cookieStore) {
        this._session = $cookieStore;

        var storedTheme = localStorage.getItem('theme');
        if(storedTheme !== null && storedTheme !== ThemeService.DEFAULT_THEME) {
            this.changeTheme(storedTheme);
        }
    }

    toggleTheme(themeName){
        if(this._currentTheme !== themeName) {
            this.changeTheme(themeName);
        } else {
            this.changeTheme(ThemeService.DEFAULT_THEME);
        }
    }

    changeTheme (themeName) {
        this._currentTheme = themeName;
        (<any>document.getElementById('stylesheet')).href = 'styles/' + themeName + '.css';
        localStorage.setItem('theme', themeName);
    }
}

app.service('ThemeService', ThemeService);

export = ThemeService;