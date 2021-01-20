// import express from 'express';
const express = require("express");
const mongoose = require('mongoose');
const router = express.Router();
// import bodyParser from 'body-parser';
// import cors from 'cors' 
const User = mongoose.model('User');

router.post('/users', (req, res) => { 
	res.send('POST HTTP method on users resource');
	console.log(req.body.text);
 });
 router.get('/users/getName', async (req, res) => { 
	
	console.log('getName:',req.body);
    return res.json({ findUser: await User.findOne({NTUID:req.body.NTUID})})
    
 });

 router.put('/users/:userId', (req, res) => { 
	res.send(
		`PUT HTTP method on users/${req.params.userId} resource`,
	);
});



module.exports = router