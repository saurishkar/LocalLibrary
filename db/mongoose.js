const mongoose = require('mongoose');

mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}_@ds135156.mlab.com:35156/local-library-saurish`, {
	useMongoClient: true
});

mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', () => {
	console.log('There was an error connecting to the database.');
});
