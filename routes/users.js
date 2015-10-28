var express = require('express');
var router = express.Router();

var pg = require('pg');

var connectionString = "pg://greenmsgdev:greenmsgdev@192.168.178.83:5432/greenmsgdevdb";

exports.findAll = function (req, res, next) {
    var results = [];
	var client = new pg.Client(connectionString);
	client.connect(function(error) {
		console.log(error);
	});
	 // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM gbi_user limit 100;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            client.end();
            //return res.json(results);
			res.send(results);
        });

        // Handle Errors
        if(err) {
          res.send(err);
        }

    });
	
};