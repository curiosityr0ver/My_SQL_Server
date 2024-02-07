const mysql = require('mysql2');
const jwt = require('jsonwebtoken')
const pool = require('../utils/db')

const loginUser = async (req, res) => {
    const { username, password } = req.body;


    pool.query('SELECT * FROM customers where username = ?',
        [username],
        (error, result) => {
            if (error) {
                res.status(500).json({ error: 'Error inserting user' });

            } else if (result.length > 0) {
                const user = result[0];
                const match = password == user.password;

                //     if (match) {
                //         const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' })
                //         res.json({ token });
                //     } else {
                //         res.send("Invalid Credentials");
                //     }
                // } else {

                res.send("User not found");
            }
        })
};

const registerUser = async (req, res) => {
    const { username, password } = req.body;


    pool.query('INSERT INTO customers (username, password) VALUES (?, ?)', [username, password], (error, result) => {
        if (error) {
            res.status(500).json({ error: 'Error inserting user' });
        } else {
            res.status(201).json({ message: 'User registered successfully', username: username });
        }
    });
};

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).send('Unauthorized');
        }

        // Attach the user ID to the request for later use
        req.userId = decoded.userId;

        // Continue to the next middleware or route
        next();
    });
};


module.exports = { getAuthor, createAuthor }