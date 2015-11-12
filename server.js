
var express = require('express'),
    employees = require('./routes/employees'),
    user = require('./routes/index'),
    login = require('./routes/login'),
    bodyParser     = require('body-parser'),    
    compression = require('compression'),
    methodOverride = require('method-override'), 
    // Leave report leave is url;
    leave = require('./routes/leaveReport'),  
    leaveReq= require('./routes/leaveRequest'),

    app = express();
    //leave Banlance 
    lbalances=require('./routes/leaveBalance'),
    app=express();

app.use(express.static('www'));

// CORS (Cross-Origin Resource Sharing) headers to support Cross-site HTTP requests
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/leave', leave.findAll); //leave is url;
app.get('/employees', employees.findAll);
app.get('/employees/:id', employees.findById);
app.get('/employees/:id/reports', employees.findReports);
app.get('/user', user.findAll);
app.get('/user/:id', user.findById);
app.use(compression());
app.use(bodyParser({
    uploadDir: __dirname + '/uploads',
    keepExtensions: true
}));
app.use(methodOverride());
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.send(500, err.message);
});

app.post('/post', login.post);
app.post('/login', login.post);
app.post('/signup', login.signup);

app.post('/leaveReq', leaveReq.leavesRequestForm);


app.set('port', process.env.PORT || 4000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});