var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var newSchema = new Schema({
	imprint: {
		type: String,
		min: 3,
		required: true
	},
	due_back: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	status: {
		type: String,
		required: true,
		enum: ['Maintenance', 'Reserved', 'Loaned', 'Available'],
		default: 'Maintenance'
	},
	book: {
		type: Schema.ObjectId,
		required: true,
		ref: 'Book'
	}
});

newSchema.virtual('url').get(function() {
	return `/catalog/bookinstance/${this._id}`;
});

var BookInstance = mongoose.model('BookInstance', newSchema);

module.exports = BookInstance;