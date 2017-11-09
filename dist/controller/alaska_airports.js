'use strict';

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fileSystem = require('file-system');

var _fileSystem2 = _interopRequireDefault(_fileSystem);

var _degreesRadians = require('degrees-radians');

var _degreesRadians2 = _interopRequireDefault(_degreesRadians);

var _db = require('../db.js');

var _db2 = _interopRequireDefault(_db);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var config = require('../middleware/config');
var auth = require('../middleware/authantication.js');
var geodist = require('geodist');
var file_details = 'alaska_airports_II.json';
module.exports = {
    register_user: function register_user(req, res, next) {
        var detail = new _db2.default.register_user({
            username: req.query.username,
            password: req.query.password
        });
        detail.save(function (err, data) {
            if (err) {
                console.log(err);
                res.status(400).json({ error: 1, message: "couldn't register" });
            } else res.json({ error: 0, message: "user registered", data: data });
        });
    },
    login: function login(req, res, next) {
        _db2.default.register_user.findOne({ username: req.query.username, password: req.query.password }, function (err, users_data) {
            if (err) {
                res.status(400).json({ error: 1, message: "check email or password" });
            } else if (users_data) {
                var payload = { id: users_data._id };
                var token = _jsonwebtoken2.default.sign(payload, config.secret);
                res.json({ message: "token generated", token: token });
            } else {
                res.json({ error: 1, message: "ivalid user ! get registered!" });
            }
        });
    },
    get_airports: function get_airports(req, res, next) {
        console.log(req.headers.Autherization);
        _fileSystem2.default.readFile(file_details, function (err, data) {
            if (err) next(err);
            res.json({
                error: 0,
                message: "all airport list",
                data: JSON.parse(data)
            });
        });
    },
    find_distance: function find_distance(req, res, next) {
        var response = void 0;
        _fileSystem2.default.readFile(file_details, function (err, data) {
            if (err) next(err);else {
                var airport_one_location = req.query.airport_location_one;
                var airport_two_location = req.query.airport_location_two;
                var found_first_airport;
                var found_second_airport;
                var airports_details = JSON.parse(data);
                _lodash2.default.forEach(airports_details, function (airport) {
                    var airport_location = airport.LocationID;
                    if (airport_location == airport_one_location) {
                        found_first_airport = airport;
                    }
                    if (airport_location == airport_two_location) {
                        found_second_airport = airport;
                    }
                });
                if (!found_first_airport || !found_second_airport) {
                    res.json({
                        error: 1,
                        message: "airport not found"
                    });
                } else {
                    var lat1 = found_first_airport.Lat;
                    var lon1 = found_first_airport.Lon;
                    var lat2 = found_second_airport.Lat;
                    var lon2 = found_second_airport.Lon;
                    var distance = geodist({ lat: lat1, lon: lon1 }, { lat: lat2, lon: lon2 });
                    res.json({
                        error: 0,
                        message: "distance found between two airports",
                        data: distance
                    });
                }
            }
        });
    },
    three_nearest_airport: function three_nearest_airport(req, res, next) {
        _fileSystem2.default.readFile(file_details, function (err, data) {
            if (err) next(err);else {
                var airport_name = req.query.fecility_name;
                var airport_details = JSON.parse(data);
                var found_airport;
                _lodash2.default.forEach(airport_details, function (airport_data) {
                    var Facility_Name = airport_data.FacilityName;
                    if (Facility_Name == airport_name) {
                        found_airport = airport_data;
                    }
                });
                if (!found_airport) {
                    res.json({
                        error: 1,
                        message: "airport not found"
                    });
                } else {
                    var lat1 = found_airport.Lat;
                    var lon1 = found_airport.Lon;
                    var lat2;
                    var lon2;
                    var airports_distance = [];
                    _lodash2.default.forEach(airport_details, function (airport_data) {
                        var Facility_Name = airport_data.FacilityName;
                        if (Facility_Name != airport_name) {
                            lat2 = airport_data.Lat;
                            lon2 = airport_data.Lon;
                            var distance = geodist({ lat: lat1, lon: lon1 }, { lat: lat2, lon: lon2 });
                            airport_data.distance = distance * 1;
                            airports_distance.push(airport_data);
                        }
                    });
                    var nearest_three = airports_distance.sort(function (a, b) {
                        return a.distance - b.distance;
                    }).slice(0, 3);
                    res.json({
                        error: 0,
                        message: "3 nearest airports",
                        data: nearest_three
                    });
                }
            }
        });
    }
};
//# sourceMappingURL=alaska_airports.js.map