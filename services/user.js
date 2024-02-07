const { v4: uuidv4 } = require('uuid')
const User = require('../models/user');
const { setUser } = require('./auth');

const handleUserSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.redirect('/');
}

const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
        return res.send("Invalid username or password");
    }

    const sessionId = uuidv4();
    const token = setUser(sessionId, user);
    res.cookie("uid", token);
    return res.redirect('/');
}

module.exports = { handleUserSignUp, handleUserLogin }
