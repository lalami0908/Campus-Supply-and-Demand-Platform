const express = require("express");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv-defaults').config();

// mongoDB connection

const mongoose = require("mongoose");
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

// ** mongoDB Model

const ChatRoom = require('./models/ChatRoom')
const Demand = require('./models/Demand')
const Message = require('./models/Message')
const Supply = require('./models/Supply')
const User = require('./models/User')

// express

const app = express();
const port = process.env.PORT || 4000 

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Passport.js
// https://medium.com/%E9%BA%A5%E5%85%8B%E7%9A%84%E5%8D%8A%E8%B7%AF%E5%87%BA%E5%AE%B6%E7%AD%86%E8%A8%98/%E7%AD%86%E8%A8%98-%E9%80%8F%E9%81%8E-passport-js-%E5%AF%A6%E4%BD%9C%E9%A9%97%E8%AD%89%E6%A9%9F%E5%88%B6-11cf478f421e
app.use(session({
    secret: 'passport-tutorial',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
require('./config/passport');


// ** express && router
const homeRouter = require('./routes/home');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const postRouter = require('./routes/post');

app.use('/', homeRouter);
app.use('/users', usersRouter);
app.use('/login',loginRouter);
app.use('/post',postRouter);


app.post('/post-test', (req, res) => {
    console.log('Got body:', req.body);
    res.sendStatus(200);
});

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