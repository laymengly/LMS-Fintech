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

/**
 * Signup
 * @param req
 * @param res
 * @param next
 * @returns {*|ServerResponse}
 */

function signup(req, res, next) {

    winston.info('signup');

    var user = req.body;

    if (!validator.isEmail(user.email)) {
        return res.send(400, "Invalid email address");
    }
    if (!validator.isLength(user.firstName, 1) || !validator.isAlphanumeric(user.firstName)) {
        return res.send(400, "First name must be at least one character");
    }
    if (!validator.isLength(user.lastName, 1) || !validator.isAlphanumeric(user.lastName)) {
        return res.send(400, "Last name must be at least one character");
    }
    if (!validator.isLength(user.password, 4)) {
        return res.send(400, "Password must be at least 4 characters");
    }

    db.query('SELECT * from lms_users where login = $1 or email = $2', [user.loginId, user.email], true)
        .then(function (u) {
            if(u) {
                return next(new Error('Email address or Login ID already registered'));
            }
            createUser(user)
                .then(function () {
                    return res.send('OK');
                })
                .catch(next);
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
    db.query('SELECT * from lms_users where login=$1 and password = $2', [user.userid, user.password], true)
        .then(function (user) {
            //console.log(user);
            if (!user) {
                return res.send(401, invalidCredentials);
            }
            return res.send(user);
            })
        .catch(next);
};

/**
 * Create a user
 * @param user
 * @param password
 * @returns {promise|*|Q.promise}
 */
function createUser(user) {

    var deferred = Q.defer(),
        externalUserId = (+new Date()).toString(); // TODO: more robust UID logic

    db.query('INSERT INTO lms_users ( ID, firstname, lastname, LOGIN, email, PASSWORD, ROLE, manager, country, organization, contract, POSITION, datehired, identifier, idap_path, active, timezone, calendar, phone, emergency ) VALUES ( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20) RETURNING ID, firstName, lastName, email',
        [externalUserId, user.firstName, user.lastName, user.loginId, user.email, user.password, '1', '1', '0', '1', '1', user.position, '2014-01-01','1', user.dep, '1', '1', '1', user.phone, user.emergency], true)
        .then(function (insertedUser) {
            deferred.resolve(insertedUser);
        })
        .catch(function(err) {
            deferred.reject(err);
        });
    return deferred.promise;
};



exports.post = testPost;    
exports.login = login;
exports.findById = findById;
exports.signup = signup;
exports.createUser = createUser;