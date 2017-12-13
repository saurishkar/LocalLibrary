var Book = require('../models/book');
var Author = require('../models/author');
var Genre = require('../models/genre');
var BookInstance = require('../models/book-instance');

exports.index_all = (req, res) => {
	var data = {}, error;
	Book.count().then((book_cnt) => {
		data.book_count = book_cnt;
		Author.count().then((author_cnt) => {
			data.author_count = author_cnt;
			Genre.count().then((genre_cnt) => {
				data.genre_count = genre_cnt;
				BookInstance.count().then((bi_cnt) => {
					data.book_instance_count = bi_cnt;
					res.render('index', {title: 'Local Library Home', data, error});
				}, (e) => {
					error = `There was an error fetching Book List, ${e}`;
				});
			}, (e) => {
				error = `There was an error fetching Book List, ${e}`;
			});
		}, (e) => {
			error = `There was an error fetching Book List, ${e}`;
		});
	}, (e) => {
		error = `There was an error fetching Book List, ${e}`;
	});
	// res.send(process.env.MONGODB_PASSWORD);
};