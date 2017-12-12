var express = require('express');

var author = require('../controllers/author');
var router = express.Router();


router.get('/authors', author.author_list);

router.get('/author/create', author.author_create_get);

router.post('/author/create', author.author_create_post);

router.get('/author/:id', author.author_detail);

router.get('/author/:id/update', author.author_update_get);

router.patch('/author/:id/update', author.author_update_post);

router.get('/author/:id/delete', author.author_delete_get);

router.delete('/author/:id/delete', author.author_delete_post);

module.exports = router;