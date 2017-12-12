const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Author = new Schema({
	firstname: {
		type: String,
		min: 3,
		max: 10,
		required: true
	},
	lastname: {
		type: String,
		min: 3,
		max: 10,
		required: true
	},
	dob: {
		type: Date
	},
	dod: {
		type: Date
	}
	
});

Author.virtual('fullname').get(() => {
	return `${this.firstname} ${this.lastname}`;
});

Author.virtual('url').get(() => {
	return `catalog/author/${this._id}`;
});

module.exports = {
	Author
};