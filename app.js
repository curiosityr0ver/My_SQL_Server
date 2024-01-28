const express = require("express");
const bodyParser = require('body-parser');
const biodataRouter = require("./routes/biodataRouter")

const app = express()
app.use(bodyParser.json());

app.use('/biodata', biodataRouter);



// Serve the HTML form for file upload
// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

app.listen(3000, () => {
    console.log("Server live on port 3000");
})