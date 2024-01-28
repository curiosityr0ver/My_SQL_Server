const csvtojson = require('csvtojson');
const pool = require('../utils/db')
const validateEntry = require('../utils/biodataSchema')
const sendResponse = require('../utils/response')
const zlib = require('zlib');

// Serve the HTML form for file upload
const getUploader = (req, res) => {
    res.sendFile(__dirname + '/index.html');
};

const getUsers = (req, res) => {

    pool.query('SELECT * FROM biodata', (error, output) => {
        // res.status(500).json({ error: 'Error retrieving data from the database' });
        sendResponse(res, error, output);

    });
};

const createUser = (req, res) => {
    const data = req.body;
    if (!validateEntry(data)) {
        res.status(500).json({ error: "Invalid/incomplete entries" })
    }
    // res.send([NID, NAME, EMAIL, AGE]);

    pool.query('INSERT INTO biodata SET ?', [data], (error, result) => {
        if (error) {
            sendResponse(res, error, { error: 'Error inserting data into the database' });
            // res.status(500).json({ error: 'Error inserting data into the database' });
        } else {
            sendResponse(res, error, { output: 'Record created successfully', NID: data.NID });
            // res.status(201).json({ message: 'Record created successfully', id: result.insertId });
        }
    });
};

const uploadUsers = (req, res) => {
    if (!req.file) {
        // return res.status(400).send('No file uploaded.');
        response(res, error, 'No file uploaded');

    }

    pool.query("TRUNCATE TABLE biodata", (error, result) => {
        sendResponse(res, error, result);
    });

    const csvData = req.file.buffer.toString('utf8');

    csvtojson().fromString(csvData).then((jsonArray) => {

        const validEntries = []
        const invalidEntries = []

        jsonArray.forEach((entry) => {
            if (validateEntry(entry)) {
                validEntries.push(entry)
            } else {
                invalidEntries.push(entry)
            }
        })


        validEntries.forEach((entry) => {
            const { NID, Name, email, age } = entry;
            // console.log(NID, Name, email, age);
            pool.query("INSERT INTO biodata (NID, NAME, EMAIL, AGE) VALUES (?, ?, ?, ?)", [NID, Name, email, age], (error, result) => {
                if (!error) {
                    console.log("********************");
                    console.log(Name, " inserted !");
                }
            });
        })
        sendResponse(res, null, { invalidEntries });
        // res.json({ invalidEntries });
    });
};


module.exports = { getUsers, getUploader, createUser, uploadUsers }