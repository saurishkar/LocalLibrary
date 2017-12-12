var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var newSchema = new Schema({
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

newSchema.virtual('url').get(() => {
	return `/catalog/bookinstance/${this._id}`;
});

var BookInstance = mongoose.model('BookInstance', newSchema);

module.exports = BookInstance;