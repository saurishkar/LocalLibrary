var Author = require('../models/author');

exports.author_list = (req, res) => {
	Author.find({}).then((docs) => {
		res.render('author_list', {title: 'Author List', data: docs});
	}, (e) => {
		res.render('author_list', {title: 'Author List', error: e});
	});
};

exports.author_detail = (req, res) => {
	res.send('Not Implemented: Author Detail');
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


