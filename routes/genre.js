var express = require('express');

var genre = require('../controllers/genre');
var router = express.Router();

router.get('/genres', genre.genre_list);

router.post('/genre/create', genre.genre_create_post);

router.get('/genre/:id', genre.genre_detail);

router.patch('/genre/:id/update', genre.genre_update_post);

router.delete('/genre/:id/delete', genre.genre_delete_post);

module.exports = router;