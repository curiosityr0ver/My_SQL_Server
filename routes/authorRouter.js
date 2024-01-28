const express = require('express');
const router = express.Router();
const { getAuthor, createAuthor } = require('../controllers/authorController');


router.get('/read', getAuthor);
router.post('/create', createAuthor);

module.exports = router;
