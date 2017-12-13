var Author = require('../models/author');
var Book = require('../models/book');

exports.author_list = (req, res) => {
	Author.find({}).then((docs) => {
		res.render('author_list', {title: 'Author List', data: docs});
	}, (e) => {
		res.render('author_list', {title: 'Author List', error: e});
	});
};

exports.author_detail = (req, res) => {
	var data = {};
	Author.findById(req.params.id).then((author) => {
		data.author = author;
		Book.find({author: req.params.id}).then((list) => {
			data.books = list;
			res.render('author_detail', {title: 'Author Detail', data});
		}, (e) => {
			res.render('author_detail', {title: 'Author Detail', error: e});
		});
	}, (e) => {
		res.render('author_detail', {title: 'Author Detail', error: e});
	});
};

exports.author_create_get = (req, res) => {
	res.send('Not Implemented: Author Create Get');
};

exports.author_create_post = (req, res) => {
	res.send('Not Implemented: Author Create Post');
};

exports.author_delete_get = (req, res) => {
	res.send('Not Implemented: Author Delete Get');
};

exports.author_delete_post = (req, res) => {
	res.send('Not Implemented: Author Delete Post');
};

exports.author_update_get = (req, res) => {
	res.send('Not Implemented: Author Update Get');
};

exports.author_update_post = (req, res) => {
	res.send('Not Implemented: Author Update Post');
};


