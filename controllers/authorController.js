const mysql = require('mysql2');
const pool = require('../utils/db')





const getAuthor = (req, res) => {

    pool.query('SELECT * FROM author', (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error retrieving data from the database' });
        } else {
            res.status(200).json(results);
        }
    });
};

const createAuthor = (req, res) => {
    const data = req.body;
    // if (!validateEntry(data)) {
    //     res.status(500).json({ error: "Invalid/incomplete entries" })
    // }
    // res.send([NID, NAME, EMAIL, AGE]);

    pool.query('INSERT INTO author SET ?', [data], (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Error inserting data into the database' });
        } else {
            res.status(201).json({ message: 'Record created successfully', id: result.insertId });
        }
    });
};


module.exports = { getAuthor, createAuthor }