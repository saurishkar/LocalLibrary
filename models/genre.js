var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Genre = new Schema({
	name: {
		type: String,
		min: 3,
		max: 100,
		required: true
	}
});

Genre.virtual('url').get(() => {
	return `/catalog/genre/${this._id}`;
});

module.exports = {
	Genre
};