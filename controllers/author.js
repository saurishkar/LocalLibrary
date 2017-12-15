var Author = require('../models/author');
var Book = require('../models/book');

exports.author_list = (req, res) => {
	Author.find({}).then((docs) => {
		res.render('author/author_list', {title: 'Author List', data: docs});
	}, (e) => {
		res.render('author/author_list', {title: 'Author List', error: e});
	});
};

exports.author_detail = (req, res) => {
	var data = {};
	Author.findById(req.params.id).then((author) => {
		data.author = author;
		Book.find({author: req.params.id}).then((list) => {
			data.books = list;
			res.render('author/author_detail', {title: 'Author Detail', data});
		}, (e) => {
			res.render('author/author_detail', {title: 'Author Detail', error: e});
		});
	}, (e) => {
		res.render('author/author_detail', {title: 'Author Detail', error: e});
	});
};

exports.author_create_get = (req, res) => {
	res.render('author/author_create');
};

exports.author_create_post = (req, res) => {
	req.sanitize('first_name').escape().trim();
	req.sanitize('family_name').escape().trim();
	req.checkBody('first_name', 'First Name is Required').notEmpty();
	req.checkBody('family_name', 'Family Name is Required').notEmpty();
	
	req.checkBody('date_of_birth', 'Date of Birth cannot be a Future Date').custom((value) => {
		var date = new Date();
		var day = date.getDate();
		var month = date.getMonth();
		var year = date.getFullYear();
		var dateObj = new Date(value);
		if(year < dateObj.getFullYear()) {
			return false;
		} else {
			if(year === dateObj.getFullYear() && month < dateObj.getMonth()) {
				return false;
			} else {
				if(year === dateObj.getFullYear() && month === dateObj.getMonth() && day < dateObj.getDate()) {
					return false;
				}
				return true;
			}
		}
	});
	
	req.checkBody('date_of_death', 'Date of Death cannot be before Date of Birth').custom((value) => {
		if(req.body.date_of_birth) {
			var birthObj = new Date(req.body.date_of_birth);
			var deathObj = new Date(value);
			if(birthObj.getFullYear() > deathObj.getFullYear()) {
				return false;
			} else {
				if(birthObj.getFullYear() === deathObj.getFullYear() && birthObj.getMonth() > deathObj.getMonth()) {
					return false;
				} else {
					if(birthObj.getFullYear() === deathObj.getFullYear() && birthObj.getMonth() === deathObj.getMonth() && birthObj.getDate() > deathObj.getDate()) {
						return false;
					}
					return true;
				}
			}
		}
		return true;
	});
	
	var errors = req.validationErrors();
	
	var newAuthor = new Author({
		first_name: req.body.first_name,
		family_name: req.body.family_name,
		date_of_birth: req.body.date_of_birth,
		date_of_death: req.body.date_of_death
	});

	if(errors) {
		return res.render('author/author_create', {data: req.body, errors});
	} else {
		Author.findOne({first_name: req.body.first_name, family_name: req.body.family_name}).then((item) => {
			if(item) {
				req.checkBody('first_name', 'This Author already exists').custom(() => false);
				errors = req.validationErrors();
				if(errors) {
					return res.render('author/author_create', {data: req.body, errors});
				}
			}
			newAuthor.save().then(() => {
				console.log('Auhtor has been created successfully');
				res.redirect('/catalog/authors');
			});
		});
	}
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


