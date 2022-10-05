require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.static(process.env.SOURCE_DIR))
app.use(cors());
const port = 3000;

const fbRoute = require('./routes/file-browser');
app.use('/files', fbRoute);
app.listen(port, ()=>{
    console.log("Server listening on port ", port);
});