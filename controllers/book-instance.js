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
	req.sanitize('imprint').escape();
	req.sanitize('imprint').trim();

	req.sanitize('dueback').escape();
	req.sanitize('dueback').trim();
	
	req.checkBody('book', 'No Book Selected').custom((value) => {
		if(value === '' || value.match(/Select a Book/)) {
			return false;
		}
		return true;
	});
	req.checkBody('status', 'No Status Selected').custom((value) => {
		if(value === '' || value.match(/Select a Status/)) {
			return false;
		}
		return true;
	});

	req.checkBody('imprint', 'Imprint is Required').notEmpty();

	req.checkBody('dueback', 'Due Back Date cannot be empty').custom((value) => {
		if(!req.body.status.match(/Available/) && value === '') {
			return false;
		}
		return true;
	});

	req.checkBody('dueback', 'Due Back Date cannot be an earlier date').custom((value) => {
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
	data = {bookinstance: req.body};
	Book.find({}).then((books) => {
		data.books = books;
		var errors = req.validationErrors();
		if(errors) {
			res.render('bookinstance/bookinstance_create', {data, errors});
		}
		var bookInstance = new BookInstance({
			imprint: req.body.imprint,
			status: req.body.status,
			book: new ObjectID(req.body.book),
			due_back: req.body.status !== 'Available' ? req.body.dueback : ''
		});

		bookInstance.save().then(() => {
			res.redirect('/catalog/bookinstances');
		}, (e) => {
			res.send('There was a problem saving the document');
		});
	});
};

exports.bookinstance_delete_get = (req, res) => {
	var data = {};
	BookInstance.findById(req.params.id).then((instance) => {
		data.instance = instance;
		res.render('bookinstance/bookinstance_delete', {data});
	}, (e) => {
		res.send('There was a prolem fetching the details of the Book instance');
	});
};

exports.bookinstance_delete_post = (req, res) => {
	BookInstance.deleteOne({_id: new ObjectID(req.params.id)}).then(() => {
		res.redirect('/catalog/bookinstances');
	}, (e) => {
		res.send('There was a problem deleting the book instance');
	});
};

exports.bookinstance_update_get = (req, res) => {
	var data = {};
	BookInstance.findById(req.params.id).then((instance) => {
		data = Object.assign({}, {bookinstance: instance});
		Book.find({}).then((books) => {
			data.books = books;
			res.render('bookinstance/bookinstance_update', {data});
		});
	}, (e) => {
		res.send('There was a problem fetching the book instance details');
	});
};

exports.bookinstance_update_post = (req, res) => {
	var data = {};
	req.sanitize('imprint').escape();
	req.sanitize('imprint').trim();

	req.sanitize('dueback').escape();
	req.sanitize('dueback').trim();
	
	req.checkBody('book', 'No Book Selected').custom((value) => {
		if(value === '' || value.match(/Select a Book/)) {
			return false;
		}
		return true;
	});
	req.checkBody('status', 'No Status Selected').custom((value) => {
		if(value === '' || value.match(/Select a Status/)) {
			return false;
		}
		return true;
	});

	req.checkBody('imprint', 'Imprint is Required').notEmpty();

	req.checkBody('dueback', 'Due Back Date cannot be empty').custom((value) => {
		if(!req.body.status.match(/Available/) && value === '') {
			return false;
		}
		return true;
	});

	req.checkBody('dueback', 'Due Back Date cannot be an earlier date').custom((value) => {
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
	data = {bookinstance: req.body};
	Book.find({}).then((books) => {
		data.books = books;
		var errors = req.validationErrors();
		if(errors) {
			res.render('bookinstance/bookinstance_update', {data, errors});
		}
		
		BookInstance.updateOne(
			{_id: new ObjectID(req.params.id)},
			{
				imprint: req.body.imprint,
				status: req.body.status,
				book: new ObjectID(req.body.book),
				due_back: req.body.status !== 'Available' ? req.body.dueback : ''
			})
			.then(() => {
				res.redirect('/catalog/bookinstances');
			}, (e) => {
				res.send('There was a problem updating the Book instance');
			});
	});
};


