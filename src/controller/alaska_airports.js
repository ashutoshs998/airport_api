import _ from 'lodash';
import fs from "file-system";
import radians from 'degrees-radians';
import db from '../db.js';
import jwt from 'jsonwebtoken';
import passport from 'passport';
var config = require('../middleware/config');
var auth = require('../middleware/authantication.js');
var geodist = require('geodist')
var file_details = 'alaska_airports_II.json'
module.exports = {
    register_user: (req, res, next) => {
        var detail = new db.register_user({
            username: req.query.username,
            password: req.query.password
        })
        detail.save(function(err, data) {
            if (err) {
                console.log(err)
                res.status(400).json({ error: 1, message: "couldn't register" });
            } else
                res.json({ error: 0, message: "user registered", data: data })
        })
    },
    login: (req, res, next) => {
        db.register_user.findOne({ username: req.query.username, password: req.query.password }, function(err, users_data) {
            if (err) {
                res.status(400).json({ error: 1, message: "check email or password" });
            } else if (users_data) {
                var payload = { id: users_data._id };
                var token = jwt.sign(payload, config.secret);
                res.json({ message: "token generated", token: token });
            } else {
                res.json({ error: 1, message: "ivalid user ! get registered!" })
            }
        });
    },
    get_airports: (req, res, next) => {
        console.log(req.headers.Autherization)
        fs.readFile(file_details, (err, data) => {
            if (err) next(err);
            res.json({
                error: 0,
                message: "all airport list",
                data: JSON.parse(data)
            });
        });
    },
    find_distance: (req, res, next) => {
        let response;
        fs.readFile(file_details, (err, data) => {
            if (err) next(err);
            else {
                var airport_one_location = req.query.airport_location_one;
                var airport_two_location = req.query.airport_location_two;
                var found_first_airport;
                var found_second_airport;
                var airports_details = JSON.parse(data);
                _.forEach(airports_details, function(airport) {
                    var airport_location = airport.LocationID;
                    if (airport_location == airport_one_location) {
                        found_first_airport = airport;
                    }
                    if (airport_location == airport_two_location) {
                        found_second_airport = airport;
                    }
                })
                if (!found_first_airport || !found_second_airport) {
                    res.json({
                        error: 1,
                        message: "airport not found",
                    })
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
    three_nearest_airport: (req, res, next) => {
        fs.readFile(file_details, (err, data) => {
            if (err) next(err);
            else {
                var airport_name = req.query.fecility_name;
                var airport_details = JSON.parse(data);
                var found_airport;
                _.forEach(airport_details, function(airport_data) {
                    var Facility_Name = airport_data.FacilityName;
                    if (Facility_Name == airport_name) {
                        found_airport = airport_data;
                    }
                })
                if (!found_airport) {
                    res.json({
                        error: 1,
                        message: "airport not found",
                    })
                } else {
                    var lat1 = found_airport.Lat;
                    var lon1 = found_airport.Lon;
                    var lat2;
                    var lon2;
                    var airports_distance = [];
                    _.forEach(airport_details, function(airport_data) {
                        var Facility_Name = airport_data.FacilityName;
                        if (Facility_Name != airport_name) {
                            lat2 = airport_data.Lat
                            lon2 = airport_data.Lon
                            var distance = geodist({ lat: lat1, lon: lon1 }, { lat: lat2, lon: lon2 });
                            airport_data.distance = distance * 1;
                            airports_distance.push(airport_data);
                        }
                    })
                    var nearest_three = airports_distance.sort(function(a, b) {
                        return a.distance - b.distance;
                    }).slice(0, 3);
                    res.json({
                        error: 0,
                        message: "3 nearest airports",
                        data: nearest_three
                    })
                }
            }
        })
    }
}