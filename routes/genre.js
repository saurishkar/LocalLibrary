var express = require('express');

var router = express.Router();

router.get('/genres', (req, res) => {
	res.send('This is the genre listing page.');
});

router.post('/genre/create', (req, res) => {
	res.send('This is the create a genre list page');
});

router.get('/genre/:id', (req, res) => {
	res.send('This is the single genre view page.');
});

router.patch('/genre/:id/update', (req, res) => {
	res.send('This is the update page of the genre.');
});

router.delete('/genre/:id/delete', (req, res) => {
	res.send('This is the delete page of a genre. ');
});

module.exports = router;