var express = require('express');
var router = express.Router(),
    db = require('./pghelper'),
    winston = require('winston'), 
    validator = require('validator'),
    Q = require('q'),              
    pg = require('pg');

var invalidCredentials = 'Invalid email or password';


function findById(req, res, next) {
    var id = req.params.id;
    var id = req.params.id;
    db.query('SELECT * from gbi_user where user_no=$1', [id], true)
        .then(function (user) {
            console.log(user);
            if (!user) {
                return res.send(401, invalidCredentials);
            }
            return res.send(user);
            })
        .catch(next);
    /*console.log('User'+id);
	var results = [];
	var client = new pg.Client(connectionString);
	client.connect(function(error) {
		console.log(error);
	});
	 // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM gbi_user where user_no = ($1);" , [id]);

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
	});*/



};
/**
 * Regular login with application credentials
 * @param req
 * @param res
 * @param next
 * @returns {*|ServerResponse}
 */
function login(req, res, next) {
    winston.info('login');

    var creds = req.body;
    console.log(creds);

    // Don't allow empty passwords which may allow people to login using the email address of a Facebook user since
    // these users don't have passwords
  /*  if (!creds.password || !validator.isLength(creds.password, 1)) {
        return res.send(401, invalidCredentials);
    }*/

    db.query('SELECT user_no, hp_no, user_nm from gbi_user where user_no=$1', [creds.user_no], true)
        .then(function (user) {
            console.log(user);
            if (!user) {
                return res.send(401, invalidCredentials);
            }
            return res.send({'user':{'email': user.email, 'firstName': user.firstname, 'lastName': user.lastname}});
           /* comparePassword(creds.password, user.password, function (err, match) {
                if (err) return next(err);
                if (match) {
                    createAccessToken(user)
                        .then(function(token) {
                            return res.send({'user':{'email': user.email, 'firstName': user.firstname, 'lastName': user.lastname}, 'token': token});
                        })
                        .catch(function(err) {
                            return next(err);    
                        });
                } else {
                    // Passwords don't match
                    return res.send(401, invalidCredentials);
                }
            });*/
        })
        .catch(next);
};

function testPost(req, res, next) {
    winston.info('login user');
    var user = req.body;
    //console.log(id)
    if (!user.password || !validator.isLength(user.password, 1)) {
        return res.send(401, invalidCredentials);
    }
    //db.query('SELECT user_no, hp_no, reg_dt, reg_tm from gbi_user where user_no=$1', [id.userid], true)
    db.query('SELECT * from users where login=$1 and password = $2', [user.userid, user.password], true)
        .then(function (user) {
            //console.log(user);
            if (!user) {
                return res.send(401, invalidCredentials);
            }
            return res.send(user);
            })
        .catch(next);
};
exports.post = testPost;
exports.login = login;
exports.findById = findById;