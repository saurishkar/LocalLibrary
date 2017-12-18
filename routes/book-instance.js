var express = require('express');

var bookInstance = require('../controllers/book-instance');

var router = express.Router();

router.get('/bookinstances', bookInstance.bookinstance_list);

router.get('/bookinstance/create', bookInstance.bookinstance_create_get);

router.post('/bookinstance/create', bookInstance.bookinstance_create_post);

router.get('/bookinstance/:id', bookInstance.bookinstance_detail);

router.patch('/bookinstance/:id/update', bookInstance.bookinstance_update_post);

router.get('/bookinstance/:id/delete', bookInstance.bookinstance_delete_get);

router.post('/bookinstance/:id/delete', bookInstance.bookinstance_delete_post);

module.exports = router;
