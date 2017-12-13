var Genre = require('../models/genre');

exports.genre_list = (req, res) => {
	Genre.find({}).then((docs) => {
		res.render('genre_list', {title: 'Genre List', data: docs});
	}, (e) => {
		res.render('genre_list', {title: 'Genre List', error: e});
	});
};

exports.genre_detail = (req, res) => {
	Genre.findById(req.params.id).then((docs) => {
		res.render('genre_detail', {title: 'Genre', data: docs});
	}, (e) => {
		res.render('genre_detail', {title: 'Genre', error: e});
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

