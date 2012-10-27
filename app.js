
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 5000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('*', function toTheRealThing (req, res, next) {
  if (req.originalUrl == '/stylesheets/style.css' ||
      req.originalUrl == '/images/toolbox_icon.png') {
    console.log('url: ', req.originalUrl);
    next();
  } else {
    res.redirect('http://nodetoolbox.com'+ req.originalUrl, 301);
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
