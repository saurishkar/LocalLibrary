var mongoose = require('mongoose');
var moment = require('moment');

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

newSchema.virtual('due_back_format').get(function() {
	return moment(this.due_back).format('MMMM Do YYYY, h:mm:ss a');
});

var BookInstance = mongoose.model('BookInstance', newSchema);

module.exports = BookInstance;