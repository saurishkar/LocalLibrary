var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/catalog/', (req, res) => {
	res.send('This is the home/index page of the LocalLibrary app');
});

module.exports = router;
