var express = require('express');
var router = express.Router(),
    db = require('./pghelper'),
    winston = require('winston'), 
    validator = require('validator'),
    Q = require('q'),              
    pg = require('pg');

exports.findAll = function (req, res, next) {
    winston.info('leave report');
    db.query('SELECT * from lms_leaves')
        .then(function (leaves) {
            if (!leaves) {
                return res.send(401, invalidCredentials);
            }
            return res.send(leaves);
            })
        .catch(next);
    
};

