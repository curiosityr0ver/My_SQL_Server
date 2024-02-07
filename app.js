const express = require("express");
const bodyParser = require('body-parser');
const biodataRouter = require("./routes/biodataRouter")
const authorRouter = require("./routes/authorRouter")
const employeeRouter = require("./routes/employeeRouter")
// const { customerLogin, customerRegister } = require('./routes/customer')
const verifyToken = require("./utils/validation")


const app = express()
app.use(bodyParser.json());

// app.use((req, res, next) => {
//     // Enable compression for all responses
//     res.setHeader('Content-Encoding', 'gzip');
//     res.setHeader('Content-Type', 'application/json');
//     next();
// });

// app.use('/', customerRouter);
app.use('/biodata', verifyToken, biodataRouter);
app.use('/author', verifyToken, authorRouter);
app.use('/employee', employeeRouter);


// Serve the HTML form for file upload
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

app.listen(3000, () => {
    console.log("Server live on port 3000");
})