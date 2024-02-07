const express = require('express');
const router = express.Router();
const { getEmployee, createEmployee } = require('../controllers/employeeController');


router.get('/', getEmployee);
router.post('/create', createEmployee);

module.exports = router;
