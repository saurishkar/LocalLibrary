const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var newSchema = new Schema({
	title: {
		type: String,
		min: [3, 'Name should be atleast 3 characters long'],
		max: 20,
		required: true
	},
	author: {
		type: Schema.ObjectId,
		min: 3,
		max: 10,
		ref: 'Author',
		required: true
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
	genre: [{
		type: Schema.ObjectId,
		min: 3,
		ref: 'Genre'
	}]
});

newSchema.virtual('url').get(() => {
	return `/catalog/book/${this._id}`;
});

var Book = mongoose.model('Book', newSchema);

module.exports = Book;