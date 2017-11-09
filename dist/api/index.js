'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _controller = require('../controller');

var _controller2 = _interopRequireDefault(_controller);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var auth = require('../middleware/authantication.js');

exports.default = function () {
    var api = (0, _express.Router)({ mergeParams: true });
    api.route('/all_airports_list').get(_passport2.default.authenticate('jwt', { session: false }), _controller2.default.alaska_airports.get_airports);
    api.route('/find_distance').get(_passport2.default.authenticate('jwt', { session: false }), _controller2.default.alaska_airports.find_distance);
    api.route('/three_nearest_airports').get(_passport2.default.authenticate('jwt', { session: false }), _controller2.default.alaska_airports.three_nearest_airport);
    api.route('/register').post(_controller2.default.alaska_airports.register_user);
    api.route('/login').post(_controller2.default.alaska_airports.login);
    return api;
};
//# sourceMappingURL=index.js.map