var express = require('express');

var router = express.Router();

router.get('/bookinstances', (req, res) => {
	res.send('This is the book instances listing page.');
});

router.post('/bookinstance/create', (req, res) => {
	res.send('This is the create a bookinstance list page');
});

router.get('/bookinstance/:id', (req, res) => {
	res.send('This is the single bookinstance view page.');
});

router.patch('/bookinstance/:id/update', (req, res) => {
	res.send('This is the update page of the bookinstance.');
});

router.delete('/bookinstance/:id/delete', (req, res) => {
	res.send('This is the delete page of a bookinstance. ');
});

module.exports = router;
