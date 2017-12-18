var { ObjectID } = require('mongodb');

var Book = require('../models/book');
var Genre = require('../models/genre');
var Author = require('../models/author');
var BookInstance = require('../models/book-instance');

exports.book_list = (req, res) => {
	Book.find({}).populate('author').then((docs) => {
		res.render('book/book_list', {title: 'Book Listing Page', data: docs});
	}, (e) => {
		res.render('book/book_list', {title: 'Book Listing Page', error: e});
	});
};

exports.book_detail = (req, res) => {
	var data = {}, error = {};
	Book.find({_id: new ObjectID(req.params.id)})
		.populate('author')
		.populate('genre')
		.then((docs) => {
			data.book = docs;
			BookInstance.find({book: req.params.id}).then((list) => {
				data.bookinstances = list;
				res.render('book/book_detail', {data});
			} ,(e) => {
				error = e;
				res.render('book/book_detail', {error});
			});
		}, (e) => {
			res.render('book/book_detail', {error: e});
		});
};

exports.book_create_get = (req, res) => {
	var data = {};
	Genre.find({}).then((genres) => {
		data.genres = genres;
		Author.find({}).then((authors) => {
			data.authors = authors;
			res.render('book/book_create', {data: data});
		}, (e) => {
			res.render('book/book_create', {error: e});
		}, (e) => {
			res.render('book/book_create', {error: e});
		});
	});
	// res.send('Not Implemented: book Create Get');
};

exports.book_create_post = (req, res) => {
	req.sanitize('book_title').escape();
	req.sanitize('book_title').trim();

	req.sanitize('book_summary').escape();
	req.sanitize('book_summary').trim();

	req.sanitize('book_isbn').escape();
	req.sanitize('book_isbn').trim();

	req.checkBody('book_title', 'Title is Required').notEmpty();
	req.checkBody('book_summary', 'Summary is Required').notEmpty();
	req.checkBody('book_author', 'Author is Required').custom((value) => {
		if(value.match(/Select an Author/) || value === '') {
			return false;
		}
		return true;
	});
	req.checkBody('book_genre', 'Genre is Required').custom((value) => {
		if(value.match(/Select a Genre/) || value === '') {
			return false;
		}
		return true;
	});

	req.checkBody('book_isbn', 'ISBN should be 10-Digit Numeric value').custom((value) => {
		if(value.length !== 10) {
			return false;
		}
		if(!value.match(/\d/)) {
			return false;
		}
		return true;
	});
	var data = req.body;
	Genre.find({}).then((genres) => {
		data.genres = genres;
		Author.find({}).then((authors) => {
			data.authors = authors;
			var errors = req.validationErrors();

			if(errors) {
				return res.render('book/book_create', {data, errors});
			}
			var book = new Book({
				title: req.body.book_title,
				summary: req.body.book_summary,
				isbn: req.body.book_isbn,
				author: new ObjectID(req.body.book_author),
				genre: new ObjectID(req.body.book_genre)
			});
			book.save().then(() => {
				res.redirect('/catalog/books');
			});
		}, (e) => {
			res.render('book/book_create', {error: e});
		}, (e) => {
			res.render('book/book_create', {error: e});
		});
	});
};

exports.book_delete_get = (req, res) => {
	var data = {};
	Book.findById(req.params.id).then((book) => {
		data.book = book;
		BookInstance.find({book: req.params.id}).then((instances) => {
			data.bookinstances = instances;
			res.render('book/book_delete', {data});
		});
	});
};

exports.book_delete_post = (req, res) => {
	Book.findById(req.params.id).then((book) => {
		BookInstance.deleteMany({book: book._id}).then(() => {
			Book.deleteOne({_id: new ObjectID(book._id)}).then(() => {
				res.redirect('/catalog/books');
			}, (e) => {
				res.send('There was a problem deleting the Book record');
			});
		}, (e) => {
			res.send('There was a problem processing the request');
		});
	}, (e) => {
		res.send('There was a problem fetching the Book details');
	});
};

exports.book_update_get = (req, res) => {
	res.send('Not Implemented: book Update Get');
};

exports.book_update_post = (req, res) => {
	res.send('Not Implemented: book Update Post');
};


