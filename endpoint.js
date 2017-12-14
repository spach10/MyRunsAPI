
var express = require('express');
var DBFunctions = require('./DBFunctions.js');
require('dotenv').config();

var DB = new DBFunctions();
// Constants
var PORT = 9090;

// App
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true, limit: '5mb'}));
app.use(bodyParser.json({limit: '5mb'}));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.route('/insert-exercise-entry/')
// Create endpoint localhost:9090/api/insert-exercise-entry
    .post(function(req, res) {
        var response;
    	if (!req.body) 
    		return res.sendStatus(400);

        // Connect to mysql db and insert data
        var dbConn = DB.connectToDB();
        DB.insertExerciseEntry(dbConn, req.body).then(function(result) {
        	dbConn.end();
            res.end('Data Inserted. ID=' + result.insertId);
	 	}).catch(function(error) {
	 	    console.log(error);
	 	    dbConn.end();
	 	    res.end('Insert failed: ' + error);
		});
    });

router.route('/insert-lat-lng-coordinates/')
// Create endpoint localhost:9090/api/insert-lat-lng-coordinates
    .post(function(req, res) {
        if (!req.body)
            return res.sendStatus(400);

        // Connect to mysql db and insert data
        var dbConn = DB.connectToDB();
        DB.insertLatLngCoordinates(dbConn, req.body).then(function(result) {
            dbConn.end();
            res.end('Data Inserted. ID=' + result.insertId);
        }).catch(function(error) {
            dbConn.end();
            res.end('Insert failed: ' + error);
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(PORT);