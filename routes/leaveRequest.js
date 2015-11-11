var express = require('express');
var router = express.Router(),
    db = require('./pghelper'),
    winston = require('winston'), 
    validator = require('validator'),
    Q = require('q'),              
    pg = require('pg');

exports.leavesRequestForm = function (req, res, next) {
    /*db.query('INSERT INTO lms_leaves VALUES ("' + req.body.name + '", "' + req.body.name.price + '")',
	function selectCb(err, results, fields) {
	    if (err) throw err;
	    else res.send('success');
	});   */ 
	db.query('INSERT INTO lms_leaves VALUES (3, "2015-11-11","2015-11-11",1,1,"go home",1,1,2,1)',
	function selectCb(err, results, fields) {
	    if (err){
	    	console.log("can not insert!!!");
	    	throw err;
	    } 
	    else{
	    	res.send('success');
	    	console.log("inserted");
	    } 
	});
};
