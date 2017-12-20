'use strict'

var DBFunctions = function() {
	var mysql = require('mysql');
	var bpromise = require('bluebird');

	this.connectToDB = function() {
		var connection = mysql.createConnection({
  			host     : process.env.host,
  			user     : process.env.dbUser,
  			password : process.env.password,
  			database : 'MyRuns'
		});
		connection.connect();
		return connection;
	}

	this.disconnectDB = function(connection) {
		connection.end();
    }

	this.insertExerciseEntry = function(conn, data) {
	console.log("entered into insert");
		return new bpromise(function(resolve, reject) {
			var query = conn.query("INSERT INTO ExerciseEntry (`id`, `mInput_type`, `mActivity_type`, `mDateTime`, `mTime`, `mDuration`, `mDistance`, `mAvg_pace`, `mAvg_speed`, `mCalorie`, `mClimb`, `mComment`) VALUES (null, " + data.mInputType + ", "+ data.mActivityType +", '"+ data.mDateTime +"', '"+ data.mTimeStamp +"', "+ data.mDuration +", "+ data.mDistance +", "+ data.mAvgPace +", "+ data.mAvgSpeed +", "+ data.mCalorie +", "+ data.mClimb +", '"+ data.mComment +"');" , function (error, results) {
				if(error) {
					reject(error);
				} else {
					resolve(results);
				}
			});
		});
	}

	this.insertLatLngCoordinates = function(conn, data) {
	    return new bpromise(function(resolve, reject) {
            var query = conn.query("INSERT INTO LatLngCoordinate (`id`, `exerciseEntryId`, `lat`, `lng`) VALUES (null, " + data.exerciseEntryId + ", "+ data.lat +", "+ data.lng +");", function (error, results) {
        	    if(error) {
        			reject(error);
        		} else {
        			resolve(results);
        		}
        	});
        });
	}

	this.getExerciseEntries = function(conn, data) {
		return new bpromise(function(resolve, reject) {
			var query = conn.query("SELECT * FROM ExerciseEntry;", function(error, results) {
				if(error) {
        			reject(error);
        		} else {
        			resolve(JSON.stringify(results));
        		}
			});
		});
	}

	this.getExerciseEntry = function(conn, id) {
		return new bpromise(function(resolve, reject) {
			var query = conn.query("SELECT * FROM ExerciseEntry WHERE id=" + id + ";", function(error, results) {
				if(error) {
        			reject(error);
        		} else {
        			resolve(JSON.stringify(results[0]));
        		}
			});
		});
	}

	this.getLatLngPointsById = function(conn, id) {
		return new bpromise(function(resolve, reject) {
			var query = conn.query("SELECT * FROM LatLngCoordinate WHERE exerciseEntryId = " + id + ";", function(error, results) {
				if (error) {
					reject(error);
				} else {
					resolve(JSON.stringify(results));
				}
			});
		});
	}
}

module.exports = DBFunctions;
