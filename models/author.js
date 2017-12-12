const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const newSchema = new Schema({
	first_name: {
		type: String,
		min: 3,
		max: 10,
		required: true
	},
	family_name: {
		type: String,
		min: 3,
		max: 10,
		required: true
	},
	date_of_birth: {
		type: Date
	},
	date_of_death: {
		type: Date
	}
	
});

newSchema.virtual('fullname').get(() => {
	return `${this.firstname} ${this.lastname}`;
});

newSchema.virtual('url').get(() => {
	return `/catalog/author/${this._id}`;
});

var Author = mongoose.model('Author', newSchema);

module.exports = Author;