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
		return new bpromise(function(resolve, reject) {
			var query = conn.query("INSERT INTO work_items (`id`, `mInput_type`, `mActivity_type`, `mDateTime`, `mTime`, `mDuration`, `mDistance`, `mAvg_pace`, `mAvg_speed`, `mCalorie`, `mClimb`, `mComment`) VALUES (null, " + data.mInput_type + ", "+ data.mActivity_type +", "+ data.mDateTime +", "+ data.mTime +", "+ data.mDuration +", "+ data.mDistance +", "+ data.mAvg_pace +", "+ data.mAvg_speed +", "+ data.mCalorie +", "+ data.mClimb +", "+ data.mComment +");" , function (error, results) {
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
            var query = conn.query("INSERT INTO work_items (`id`, `exerciseEntryId`, `lat`, `lng`) VALUES (null, " + data.exerciseEntryId + ", "+ data.lat +", "+ data.lng +");" , function (error, results) {
        	    if(error) {
        			reject(error);
        		} else {
        			resolve(results);
        		}
        	});
        });
	}
}

module.exports = DBFunctions;
