var express = require('express');

var router = express.Router();

router.get('/authors', (req, res) => {
	res.send('This is the author listing page.');
});

router.post('/author/create', (req, res) => {
	res.send('This is the create a author list page');
});

router.get('/author/:id', (req, res) => {
	res.send('This is the single author view page.');
});

router.patch('/author/:id/update', (req, res) => {
	res.send('This is the update page of the author.');
});

router.delete('/author/:id/delete', (req, res) => {
	res.send('This is the delete page of a author. ');
});

module.exports = router;