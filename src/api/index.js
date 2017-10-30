import { Router } from 'express';
import controller from "../controller";
import passport from 'passport';
var auth = require('../middleware/authantication.js');
export default () => {
    let api = Router({ mergeParams: true });
    api.route('/all_airports_list').get(passport.authenticate('jwt', { session: false }), controller.alaska_airports.get_airports);
    api.route('/find_distance').get(passport.authenticate('jwt', { session: false }), controller.alaska_airports.find_distance);
    api.route('/three_nearest_airports').get(passport.authenticate('jwt', { session: false }), controller.alaska_airports.three_nearest_airport);
    api.route('/register').post(controller.alaska_airports.register_user);
    api.route('/login').post(controller.alaska_airports.login);
    return api;
}