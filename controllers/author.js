var { ObjectID } = require('mongodb');

var Author = require('../models/author');
var Book = require('../models/book');
var BookInstance = require('../models/book-instance');

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
		return res.render('author/author_create', {data: {author: req.body}, errors});
	} else {
		Author.findOne({first_name: req.body.first_name, family_name: req.body.family_name}).then((item) => {
			if(item) {
				req.checkBody('first_name', 'This Author already exists').custom(() => false);
				errors = req.validationErrors();
				if(errors) {
					return res.render('author/author_create', {data: {author: req.body}, errors});
				}
			}
			newAuthor.save().then(() => {
				console.log('Author has been created successfully');
				res.redirect('/catalog/authors');
			});
		});
	}
};

exports.author_delete_get = (req, res) => {
	var data = {};
	// console.log(req.body);
	Author.findById(req.params.id).then((item) => {
		data.author = item;
		Book.find({author: req.params.id}).then((books) => {
			data.books = books;
			res.render('author/author_delete', {data});
		}, (e) => {
			res.send('There was an error fetching data from the server');
		});
	}, (e) => {
		res.send('There was an error fetching author data from the server');
	});
};

exports.author_delete_post = (req, res) => {
	Book.find({author: req.params.id}).then((books) => {
		if(books.length > 0) {
			books.map((book) => {
				BookInstance.deleteMany({book: book._id}).then(() => {
					Book.deleteOne({_id: new ObjectID(book._id)}).then(() => {
						Book.find({author: req.params.id}).then((books) => {
							if(books.length === 0) {
								Author.deleteOne({_id: new ObjectID(req.params.id)}).then(() => {
									res.redirect('/catalog/authors');
								});
							}
						});
					});
				});
			});
		} else {
			Author.deleteOne({_id: new ObjectID(req.params.id)}).then(() => {
				res.redirect('/catalog/authors');
			});
		}
	});
};

exports.author_update_get = (req, res) => {
	var data = {};
	Author.findById(req.params.id).then((author) => {
		data = Object.assign({}, {author});
		res.render('author/author_update', {data});
	}, (e) => {
		res.send('There was a problem with fetching the author details');
	});
};

exports.author_update_post = (req, res) => {
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

	if(errors) {
		return res.render('author/author_update', {data: {author: req.body}, errors});
	} else {
		Author.updateOne(
			{_id: new ObjectID(req.params.id)},
			{
				first_name: req.body.first_name,
				family_name: req.body.family_name,
				date_of_birth: req.body.date_of_birth,
				date_of_death: req.body.date_of_death
			})
			.then(() => {
				console.log('Author has been updated successfully');
				res.redirect('/catalog/authors');
			});
	}
};
