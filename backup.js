const express = require("express");
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const multer = require('multer');
const csvtojson = require('csvtojson');
const Joi = require('joi');

const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'hiranmayee'
};

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

const app = express()
app.use(bodyParser.json());

app.use('/biodata', biodataRouter);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const pool = mysql.createConnection(dbConfig);


// Serve the HTML form for file upload
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log("Server live on port 3000");
})
app.get('/read', (req, res) => {
    const connection = mysql.createConnection(dbConfig);

    connection.query('SELECT * FROM biodata', (error, results) => {
        connection.end();
        if (error) {
            res.status(500).json({ error: 'Error retrieving data from the database' });
        } else {
            res.status(200).json(results);
        }
    });
});

app.post('/create', (req, res) => {
    const data = req.body;

    // res.send([NID, NAME, EMAIL, AGE]);

    pool.query('INSERT INTO biodata SET ?', [data], (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Error inserting data into the database' });
        } else {
            res.status(201).json({ message: 'Record created successfully', id: result.insertId });
        }
    });
});

app.post('/upload', upload.single('csvFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    pool.query("TRUNCATE TABLE biodata", (error, result) => {
        console.log(result)
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
                console.log("********************");
                if (!error) {
                    console.log(Name, " inserted !");
                }
            });
        })
        res.json({ invalidEntries });
    });
});

const biodataSchema = Joi.object({
    NID: Joi.string().required(),
    Name: Joi.string().required(),
    email: Joi.string().email().required(),
    age: Joi.number().integer().min(1).required()
});

const validateEntry = (entry) => {
    const { error } = biodataSchema.validate(entry)
    return (!error)
}