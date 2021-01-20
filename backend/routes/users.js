// import express from 'express';
const express = require("express");
const router = express.Router();
// import bodyParser from 'body-parser';
// import cors from 'cors' 
import {User } from '../models'

router.post('/users', (req, res) => { 
	res.send('POST HTTP method on users resource');
	console.log(req.body.text);
 });
 router.get('/users/getName', async (req, res) => { 
	
	console.log('getName:',req.body);
    return res.json({ findUser: (await User.findOne({NTUID:req.body.NTUID})).name})
    
 });

 router.put('/users/:userId', (req, res) => { 
	res.send(
		`PUT HTTP method on users/${req.params.userId} resource`,
	);
});



module.exports = router