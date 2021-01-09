// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors' 
// import mongoose from 'mongoose' 
// // import User from './models/user.js';
// import dotenv from 'dotenv-defaults' 
const express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv-defaults').config();
 

// require('dotenv-defaults').config();

if (!process.env.MONGO_URL) { 
	console.error('Missing MONGO_URL!!!') 
	process.exit(1)
}
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
mongoose.connect(process.env.MONGO_URL, dbOptions) .then(res => {
console.log('mongo db connection created') })
const db = mongoose.connection;

// import homeRouter from './routes/home.js'; 
// import usersRouter from './routes/users.js';
// import loginRouter from './routes/login';
const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');

const app = express();
const port = process.env.PORT || 4000 

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', homeRouter);
app.post('/post-test', (req, res) => {
    console.log('Got body:', req.body);
    res.sendStatus(200);
});
app.use('/users', usersRouter);
app.use('/login',loginRouter);

app.post('/users', (req, res) => { 
	res.send('POST HTTP method on users resource');
	console.log(req.body.text);
 });

app.post('/login', (req, res) => { 
	res.send('POST HTTP method on login resource');
	console.log(req.body.text);
});

app.put('/users/:userId', (req, res) => { 
	res.send(
		`PUT HTTP method on users/${req.params.userId} resource`,
	);
});

app.listen(port, () =>
	console.log(`Example app listening on port ${port}!`),
);