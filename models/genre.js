var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var newSchema = new Schema({
	name: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true,
	}
});

newSchema.virtual('url').get(function () {
	return `/catalog/genre/${this._id}`;
});

var Genre = mongoose.model('Genre', newSchema);

module.exports = Genre;