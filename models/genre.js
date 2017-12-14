var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var newSchema = new Schema({
	name: {
		type: String,
		minLength: 3,
		maxLength: 100,
		required: true,
		validate: {
			validator: (v) => {
				return v.length < 3 ? false: true;
			},
			message: '{VALUE} should be atleast 3 characters long'
		}
	}
});

newSchema.virtual('url').get(function () {
	return `/catalog/genre/${this._id}`;
});

var Genre = mongoose.model('Genre', newSchema);

module.exports = Genre;