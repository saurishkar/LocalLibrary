var BookInstance = require('../models/book-instance');

exports.bookinstance_list = (req, res) => {
	BookInstance.find({})
		.populate('book')
		.then((docs) => {
			res.render('bookinstance_list', {title: 'Book Instance List', data: docs});
		}, (e) => {
			res.render('bookinstance_list', {title: 'Book Instance List', error: e});
		});
};

exports.bookinstance_detail = (req, res) => {
	res.send('Not Implemented: bookinstance Detail');
};

exports.bookinstance_create_get = (req, res) => {
	res.send('Not Implemented: bookinstance Create Get');
};

exports.bookinstance_create_post = (req, res) => {
	res.send('Not Implemented: bookinstance Create Post');
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


