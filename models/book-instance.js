var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var BookInstance = new Schema({
	imprint: {
		type: String,
		min: 3,
		required: true
	},
	due_date: {
		type: Date,
		required: true,
		default: new Date(),
	},
	status: {
		type: String,
		required: true,
		enum: ['Maintainence', 'Reserved', 'Loaned', 'Available'],
		default: 'Maintainence'
	}
});

BookInstance.virtual('url').get(() => {
	return `/catalog/bookinstance/${this._id}`;
});

module.exports = {
	BookInstance
};