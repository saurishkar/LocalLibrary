var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/catalog');
});

router.get('/catalog', (req, res) => {
	res.render('index', {title: 'Default Title'});
});

module.exports = router;
