const mongoose = require('mongoose');
var moment = require('moment');

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

newSchema.virtual('fullname').get(function () {
	return `${this.first_name} ${this.family_name}`;
});

newSchema.virtual('url').get(function () {
	return `/catalog/author/${this._id}`;
});

newSchema.virtual('timeline_format').get(function () {
	var birth = '', death = '';
	if(this.date_of_birth) {
		birth = moment(this.date_of_birth).format('YYYY');
	}
	if(this.date_of_death) {
		death = moment(this.date_of_death).format('YYYY');
	}
	return `${birth} - ${death}`;
});

var Author = mongoose.model('Author', newSchema);

module.exports = Author;