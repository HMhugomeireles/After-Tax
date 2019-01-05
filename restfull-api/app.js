const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const unMarriedRouter = require('./api/routes/unmarried');
const marriedRouter = require('./api/routes/married');

const mongoDB = 'mongodb://aftertax:apirest2018tax@cluster0-shard-00-00-vhziy.mongodb.net:27017,cluster0-shard-00-01-vhziy.mongodb.net:27017,cluster0-shard-00-02-vhziy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true';

mongoose.connect(mongoDB, { useNewUrlParser: true }).then(() => console.log('MongoDB Atlas Connect.'));
mongoose.Promise = global.Promise;
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'))


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// CROSS ORIGIN ALLOW ALL
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT', 'POST', 'GET');
        return res.status(200).json({});
    }
    next();
})

// entry point
app.use('/unmarried', unMarriedRouter);
app.use('/married', marriedRouter);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;