var express = require('express');

var genre = require('../controllers/genre');
var router = express.Router();

router.get('/genres', genre.genre_list);

router.get('/genre/create', genre.genre_create_get);

router.post('/genre/create', genre.genre_create_post);

router.get('/genre/:id', genre.genre_detail);

router.patch('/genre/:id/update', genre.genre_update_post);

router.get('/genre/:id/delete', genre.genre_delete_get);

router.post('/genre/:id/delete', genre.genre_delete_post);

module.exports = router;