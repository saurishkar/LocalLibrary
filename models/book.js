const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var newSchema = new Schema({
	title: {
		type: String,
		min: [3, 'Name should be atleast 3 characters long'],
		max: 20
	},
	author: {
		type: String,
		min: 3,
		max: 10
	},
	isbn: {
		type: String,
		min: 10,
		max: 10,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	genre: {
		type: String,
		required: true,
		min: 3
	}
});

var Book = mongoose.Model('Book', newSchema);

module.exports {
	Book
};