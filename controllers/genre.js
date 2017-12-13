var Genre = require('../models/genre');
var Book = require('../models/book');

exports.genre_list = (req, res) => {
	Genre.find({}).then((docs) => {
		res.render('genre/genre_list', {title: 'Genre List', data: docs});
	}, (e) => {
		res.render('genre/genre_list', {title: 'Genre List', error: e});
	});
};

exports.genre_detail = (req, res) => {
	var data = {}, error = {};
	Genre.findById(req.params.id).then((docs) => {
		data.genre = docs;
		Book.find({genre: req.params.id}).then((list) => {
			data.books = list;
			res.render('genre/genre_detail', {title: 'Genre', data});
		}, (e) => {
			error = e;
			res.render('genre/genre_detail', {title: 'Genre', error: error});
		});
	}, (e) => {
		error = e;
	});
};

exports.genre_create_get = (req, res) => {
	res.send('Not Implemented: genre Create Get');
};

exports.genre_create_post = (req, res) => {
	res.send('Not Implemented: genre Create Post');
};

exports.genre_delete_get = (req, res) => {
	res.send('Not Implemented: genre Delete Get');
};

exports.genre_delete_post = (req, res) => {
	res.send('Not Implemented: genre Delete Post');
};

exports.genre_update_get = (req, res) => {
	res.send('Not Implemented: genre Update Get');
};

exports.genre_update_post = (req, res) => {
	res.send('Not Implemented: genre Update Post');
};


