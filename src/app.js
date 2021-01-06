const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes');
const database = require('./Database/Connection');

const app = express();

dotenv.config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

database.connect();

app.use(cors());
app.use(express.json());
app.use(router);

if (process.env.NODE_ENV != 'test') {
    app.listen(process.env.PORT || 3000);
}

module.exports = app;