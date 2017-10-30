import http from 'http';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import db from './db.js';
import api from './api';
import passport from 'passport';
let app = express();
app.server = http.createServer(app);
app.use(morgan('dev'));
app.use(cors())
app.use(passport.initialize());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.text({
    type: "text/plain"
}));
app.use('/', api());
app.use(errorHandler);

function errorHandler(err, req, res, next) {
    if (err) {
        console.log(err)
        res.status(400).json({ "error": 1, "message": err, "data": err });
    }
}
app.server.listen(process.env.PORT || 3036, () => {
    console.log(`Started on port ${app.server.address().port}`);
});