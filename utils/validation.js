const jwt = require('jsonwebtoken')


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        // Redirect to login or register if no token
        res.redirect('/login'); // Assuming you have a login route
        return;
    }

    jwt.verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            // Redirect to login or register if token is invalid
            res.redirect('/login'); // Assuming you have a login route
            return;
        }

        // Attach the user ID to the request for later use
        req.userId = decoded.userId;

        // Continue to the next middleware or route
        next();
    });
};

module.exports = verifyToken;