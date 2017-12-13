var Book = require('../models/book');

exports.book_list = (req, res) => {
	Book.find({}).populate('author').then((docs) => {
		res.render('book_list', {title: 'Book Listing Page', data: docs});
	}, (e) => {
		res.render('book_list', {title: 'Book Listing Page', error: e});
	});
};

exports.book_detail = (req, res) => {
	res.send('Not Implemented: book Detail');
};

exports.book_create_get = (req, res) => {
	res.send('Not Implemented: book Create Get');
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


