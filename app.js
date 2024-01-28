const express = require("express");
const bodyParser = require('body-parser');
const biodataRouter = require("./routes/biodataRouter")
const authorRouter = require("./routes/authorRouter")
const employeeRouter = require("./routes/employeeRouter")


const app = express()
app.use(bodyParser.json());

app.use((req, res, next) => {
    // Enable compression for all responses
    res.setHeader('Content-Encoding', 'gzip');
    res.setHeader('Content-Type', 'application/json');
    next();
});

app.use('/biodata', biodataRouter);
app.use('/author', authorRouter);
app.use('/employee', employeeRouter);


// Serve the HTML form for file upload
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

app.listen(3000, () => {
    console.log("Server live on port 3000");
})