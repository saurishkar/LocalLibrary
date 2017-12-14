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
	res.render('genre/genre_create');
};

exports.genre_create_post = (req, res) => {
	req.checkBody('genre_name', 'Genre Name Required').notEmpty();

	req.sanitize('genre_name').escape();
	req.sanitize('genre_name').trim();

	req.checkBody('genre_name', 'Genre Name should only contain letters').isAlpha();
	req.checkBody('genre_name', 'Genre Name should be atleast 3 characters and atmost 100 characters').isLength({min: 3, max: 100});
	var errors = req.validationErrors();
	var newGenre = new Genre({
		name: req.body.genre_name.toLowerCase()
	});
	if(errors) {
		return res.render('genre/genre_create', {data: req.body, errors});
	} else {
		Genre.findOne({name: req.body.genre_name.toLowerCase()}).then((item) => {
			if(item) {
				req.checkBody('genre_name', 'Genre Already Exists').custom(() => false);
				errors = req.validationErrors();
				if(errors)
					return res.render('genre/genre_create', {data: req.body, errors});
			}
			newGenre.save().then(() => {
				res.redirect('/catalog/genres');
			});
		});
	}
	// res.redirect('/catalog/genres'); //, {flash: `${req.body.genre_name} successfully created.`}
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


