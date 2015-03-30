import app = require('app');
import UserService = require('../services/user-service');
import PathwayService = require('../services/pathway-service');
import Navbar = require('../components/navbar/navbar');
var imported = [UserService, PathwayService, Navbar]; //TODO: HACK!!!

function SettingsController() {
}

app.controller('SettingsController', SettingsController);

export = SettingsController;