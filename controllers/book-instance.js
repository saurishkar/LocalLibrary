var { ObjectID } = require('mongodb'); 

var BookInstance = require('../models/book-instance');
var Book = require('../models/book');

exports.bookinstance_list = (req, res) => {
	BookInstance.find({})
		.populate('book')
		.then((docs) => {
			res.render('bookinstance/bookinstance_list', {title: 'Book Instance List', data: docs});
		}, (e) => {
			res.render('bookinstance/bookinstance_list', {title: 'Book Instance List', error: e});
		});
};

exports.bookinstance_detail = (req, res) => {
	BookInstance.findById(req.params.id).populate('book').then((item) => {
		res.render('bookinstance/bookinstance_detail', {title: 'Book Instance Detail', data: item});
	}, (e) => {
		res.render('bookinstance/bookinstance_detail', {title: 'Book Instance Detail', error: e});
	});
};

exports.bookinstance_create_get = (req, res) => {
	var data = {};
	Book.find({}).then((books) => {
		data.books = books;
		res.render('bookinstance/bookinstance_create', {data});
	}, (e) => {
		res.send('There was an error processing the request');
	});
};

exports.bookinstance_create_post = (req, res) => {
	var data = {};
	req.sanitize('bookinstance_imprint').escape();
	req.sanitize('bookinstance_imprint').trim();

	req.sanitize('bookinstance_dueback').escape();
	req.sanitize('bookinstance_dueback').trim();
	data = req.body;
	req.checkBody('bookinstance_book', 'No Book Selected').custom((value) => {
		if(value === '' || value.match(/Select a Book/)) {
			return false;
		}
		return true;
	});
	req.checkBody('bookinstance_status', 'No Status Selected').custom((value) => {
		if(value === '' || value.match(/Select a Status/)) {
			return false;
		}
		return true;
	});

	req.checkBody('bookinstance_imprint', 'Imprint is Required').notEmpty();

	req.checkBody('bookinstance_dueback', 'Due Back Date cannot be empty').custom((value) => {
		if(!req.body.bookinstance_status.match(/Available/) && value === '') {
			return false;
		}
		return true;
	});

	req.checkBody('bookinstance_dueback', 'Due Back Date cannot be an earlier date').custom((value) => {
		var crr_date = new Date();
		var dateObj = new Date(value);
		if(crr_date.getFullYear() > dateObj.getFullYear()) {
			return false;
		} else {
			if(crr_date.getMonth() > dateObj.getMonth()) {
				return false;
			} else {
				if(crr_date.getDate() > dateObj.getDate()) {
					return false;
				}
				return true;
			}
		}
	});
	Book.find({}).then((books) => {
		data.books = books;
		var errors = req.validationErrors();
		if(errors) {
			res.render('bookinstance/bookinstance_create', {data, errors});
		}
		var bookInstance = new BookInstance({
			imprint: req.body.bookinstance_imprint,
			status: req.body.bookinstance_status,
			book: new ObjectID(req.body.bookinstance_book),
			due_back: req.body.bookinstance_status !== 'Available' ? req.body.bookinstance_dueback : ''
		});

		bookInstance.save().then(() => {
			res.redirect('/catalog/bookinstances');
		}, (e) => {
			res.send('There was a problem saving the document');
		});
	});
};

exports.bookinstance_delete_get = (req, res) => {
	res.send('Not Implemented: bookinstance Delete Get');
};

exports.bookinstance_delete_post = (req, res) => {
	res.send('Not Implemented: bookinstance Delete Post');
};

exports.bookinstance_update_get = (req, res) => {
	res.send('Not Implemented: bookinstance Update Get');
};

exports.bookinstance_update_post = (req, res) => {
	res.send('Not Implemented: bookinstance Update Post');
};


