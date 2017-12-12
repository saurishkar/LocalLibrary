var express = require('express');
var router = express.Router();

router.get('/books', (req, res) => {
	res.send('This is the book listing page.');
});

router.post('/book/create', (req, res) => {
	res.send('This is the create a book list page');
});

router.get('/book/:id', (req, res) => {
	res.send('This is the single book view page.');
});

router.patch('/book/:id/update', (req, res) => {
	res.send('This is the update page of the book.');
});

router.delete('/book/:id/delete', (req, res) => {
	res.send('This is the delete page of a book. ');
});

module.exports = router;