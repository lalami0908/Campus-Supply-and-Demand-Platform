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

let isConnected = false; 

const connectWithRetry = () => {
	mongoose.connect(process.env.MONGO_URL, dbOptions, (err) => {
	  if (err) {
		console.error('Failed to connect to the database with error: ', err);
		console.log('Will wait 1 minutes and try again')
		setTimeout(connectWithRetry, 1 * 60 * 1000);
	  }
	});
  };
  
  mongoose.connection.on('connected', () => {
	isConnected = true;
	console.log('Connected to database');
  });
  
  mongoose.connection.on('disconnected', () => {
	isConnected = false;
	console.log('Disconnected to database');
  });
  

connectWithRetry();

const db = mongoose.connection;

// ** mongoDB Model


const Demand = require('./models/Demand')
const Message = require('./models/Message')
const Supply = require('./models/Supply')
const User = require('./models/User')
const Personal = require('./models/Personal') 
// express

const app = express();
const port = process.env.PORT || 4000 

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Passport.js

app.use(session({
    secret: 'passport-tutorial',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}));
require('./config/passport');


// ** express && router
// const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const loginRouter = require('./routes/login');
const postRouter = require('./routes/post');
const messageRouter = require('./routes/message');

// app.use('/', homeRouter);
app.use('/user', userRouter);
app.use('/login',loginRouter);
app.use('/post',postRouter);
app.use('/message',messageRouter);

const path = require('path')
app.use('/public', express.static(path.join(__dirname, 'public')))


app.post('/user', (req, res) => { 
	res.send('POST HTTP method on user resource');
	console.log(req.body.text);
 });

app.post('/login', (req, res) => { 
	res.send('POST HTTP method on login resource');
	console.log(req.body.text);
});

app.put('/user/:userId', (req, res) => { 
	res.send(
		`PUT HTTP method on user/${req.params.userId} resource`,
	);
});

app.listen(port, () =>
	console.log(`Example app listening on port ${port}!`),
);

app.use((err, req, res, next) => {
	console.log(err + '')
	res.json({
	  ok: false,
	  message: '伺服器出現錯誤'
	})
})