import { Router } from 'express';
import controller from "../controller";
export default () => {
    let api = Router({ mergeParams: true });
    api.route('/all_airports_list').get(controller.alaska_airports.get_airports);
    api.route('/find_distance').get(controller.alaska_airports.find_distance);
    api.route('/three_nearest_airports').get(controller.alaska_airports.three_nearest_airport);
    return api;
}