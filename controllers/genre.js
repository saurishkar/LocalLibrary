var {ObjectID} = require('mongodb');

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
			res.render('genre/genre_detail', {title: 'Genre', error});
		});
	}, (e) => {
		error = e;
	});
};

exports.genre_create_get = (req, res) => {
	res.render('genre/genre_create');
};

exports.genre_create_post = (req, res) => {
	req.checkBody('name', 'Genre Name Required').notEmpty();

	req.sanitize('name').escape();
	req.sanitize('name').trim();

	req.checkBody('name', 'Genre Name should be atleast 3 characters and atmost 100 characters').isLength({min: 3, max: 100});
	var errors = req.validationErrors();
	var newGenre = new Genre({
		name: req.body.name.toLowerCase()
	});
	if(errors) {
		return res.render('genre/genre_create', {data: {genre: req.body}, errors});
	} else {
		Genre.findOne({name: req.body.name.toLowerCase()}).then((item) => {
			if(item) {
				req.checkBody('name', 'Genre Already Exists').custom(() => false);
				errors = req.validationErrors();
				if(errors)
					return res.render('genre/genre_create', {data: {genre: req.body}, errors});
			}
			newGenre.save().then(() => {
				res.redirect('/catalog/genres');
			});
		});
	}
	// res.redirect('/catalog/genres'); //, {flash: `${req.body.name} successfully created.`}
};

exports.genre_delete_get = (req, res) => {
	var data = {};
	Genre.findById(req.params.id).then((genreItem) => {
		data.genre = genreItem;
		Book.find({genre: req.params.id}).then((books) => {
			data.books = books;
			res.render('genre/genre_delete', {data});	
		}, (e) => {
			res.send('There was a problem deleting all the book records for the genre');
		});
	}, (e) => {
		res.send('There was a problem fetching the genre details');
	});
};

exports.genre_delete_post = (req, res) => {
	Genre.deleteOne({_id: new ObjectID(req.params.id)}).then(() => {
		res.redirect('/catalog/genres');
	}, (e) => {
		res.send('There was a problem fetching the genre details');
	});
};

exports.genre_update_get = (req, res) => {
	var data = {};
	Genre.findById(req.params.id).then((genre) => {
		data = Object.assign({}, {genre});
		res.render('genre/genre_update', {data});
	}, (e) => {
		res.send('There was a problem fetching the genre details');
	});
};

exports.genre_update_post = (req, res) => {
	req.checkBody('name', 'Genre Name Required').notEmpty();

	req.sanitize('name').escape();
	req.sanitize('name').trim();

	req.checkBody('name', 'Genre Name should be atleast 3 characters and atmost 100 characters').isLength({min: 3, max: 100});
	var errors = req.validationErrors();
	if(errors) {
		return res.render('genre/genre_update', {data: {genre: req.body}, errors});
	} else {
		Genre.updateOne(
			{_id: req.params.id},
			{
				name: req.body.name.toLowerCase()
			})
			.then(() => {
				res.redirect('/catalog/genres');
			});
	}
};


