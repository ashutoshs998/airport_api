var mongoose = require('mongoose');
var http = require('http');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
mongoose.Promise = global.Promise;
var conn = mongoose.connect('mongodb://localhost/alaska_db');

var user_details = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
    collection: 'registered_users',
    strict: true
});
var user_data = conn.model("user_data", user_details);
module.exports = {
    register_user: user_data

}