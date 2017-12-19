var mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGOOSE_DB_PATH}`, {
	useMongoClient: true
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', () => {
	console.log('ENV variables', process.env);
	console.log('There was an error connecting to the database.');
});

module.exports = {
	mongoose
};