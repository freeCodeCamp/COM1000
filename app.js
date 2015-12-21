var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');
var config = require('./config');
var ObjectID = require('mongodb').ObjectID;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({parameterLimit: 10000000,
  limit: '50mb',
  extended: true}
));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'public')));

/*eslint-disable*/
app.post('/export', function(req, res, next) {
  /*eslint-enable*/
  Object.keys(req.body.data).forEach(function(file) {
    console.log(file);
    var fileData = req.body.data[file];
    console.log('writing file data');
    console.log(JSON.stringify(fileData, null, 2));
    fs.writeFile(config.fccPath + file,
      JSON.stringify(fileData, null, 2),
      function(err) {
        console.error(err);
      }
    );
  });
});

app.get('/files', (req, res, next) => {
  var fileObj;
  fs.readdir(config.fccPath, (err, files) => {
    if (err) {
      return next(err);
    }
    fileObj = files.reduce((acc, curr) => {
      acc[curr] = fs.readdirSync(`${config.fccPath}/${curr}`);
      return acc;
    }, {});
    console.log(fileObj);
    return res.json(fileObj);
  });
});

app.get('/files/:filePath/:fileName', (req, res, next) => {
  fs.readFile(`${config.fccPath}/${req.params.filePath}/${req.params.fileName}`,
  'utf8',
  (err, data) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    return res.json(data);
  });
});

/*eslint-disable*/
app.get('/mongoid', function(req, res, next) {
  /*eslint-enable*/
  var objectId = new ObjectID();
  res.json({objectId: objectId});
});

/*eslint-disable*/
app.get('/*', function(req, res, next) {
  /*eslint-enable*/
  res.render('index', {title: 'COM1000'});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  /*eslint-disable*/
  app.use(function(err, req, res, next) {
    /*eslint-enable*/
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
/*eslint-disable*/
app.use(function(err, req, res, next) {
  /*eslint-enable*/
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
