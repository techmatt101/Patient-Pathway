import app = require('app');
import UserService = require('../services/user-service');
import PathwayService = require('../services/pathway-service');
import PointService = require('../services/point-service');
import MediaService = require('../services/media-service');
import Navbar = require('../components/navbar/navbar');
import Timeline = require('../components/timeline/timeline');
var imported = [UserService, PathwayService, PointService, MediaService, Navbar, Timeline]; //TODO: HACK!!!


function PathwayController() {
}

app.controller('PathwayController', PathwayController);

export = PathwayController;