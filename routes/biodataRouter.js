const express = require('express');
const router = express.Router();
const { getUsers, createUser, uploadUsers } = require('../controllers/biodataController');
const multer = require('multer');


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/read', getUsers);
router.post('/create', createUser);
router.post('/upload', upload.single('csvFile'), uploadUsers)

module.exports = router;
