var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression');
var helmet = require('helmet');
var expressValidator = require('express-validator');
if(process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
var { mongoose } = require('./db/mongoose');
var index = require('./routes/index');
var author = require('./routes/author');
var genre = require('./routes/genre');
var book = require('./routes/book');
var bookInstance = require('./routes/book-instance');


var app = express();
app.use(helmet());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//
app.use(compression()); // compress all routes
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());

app.use('/', index);
app.use('/catalog', book);
app.use('/catalog', bookInstance);
app.use('/catalog', genre);
app.use('/catalog', author);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.set('port', process.env.PORT || 3000);

module.exports = app;
