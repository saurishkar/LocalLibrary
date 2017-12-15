var { ObjectID } = require('mongodb');

var Book = require('../models/book');
var Genre = require('../models/genre');
var Author = require('../models/author');
var BookInstance = require('../models/book-instance');

exports.book_list = (req, res) => {
	Book.find({}).populate('author').then((docs) => {
		console.log('book-list', docs);
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
	res.send('Not Implemented: book Create Post');
};

exports.book_delete_get = (req, res) => {
	res.send('Not Implemented: book Delete Get');
};

exports.book_delete_post = (req, res) => {
	res.send('Not Implemented: book Delete Post');
};

exports.book_update_get = (req, res) => {
	res.send('Not Implemented: book Update Get');
};

exports.book_update_post = (req, res) => {
	res.send('Not Implemented: book Update Post');
};


