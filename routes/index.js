var express = require('express');
var router = express.Router();

var index = require('../controllers/index');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.redirect('/catalog');
});

router.get('/catalog', index.index_all);

module.exports = router;
