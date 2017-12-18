var express = require('express');

var book = require('../controllers/book');
var router = express.Router();

router.get('/books', book.book_list);

router.get('/book/create', book.book_create_get);

router.post('/book/create', book.book_create_post);

router.get('/book/:id', book.book_detail);

router.patch('/book/:id/update', book.book_update_post);

router.get('/book/:id/delete', book.book_delete_get);

router.post('/book/:id/delete', book.book_delete_post);

module.exports = router;