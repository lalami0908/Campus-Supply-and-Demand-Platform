// import express from 'express';
const express = require("express");
const router = express.Router();
// import bodyParser from 'body-parser';
// import cors from 'cors' 
import {User,Personal,BASE_URL } from '../models'

router.post('/users', (req, res) => { 
	res.send('POST HTTP method on users resource');
	console.log(req.body.text);
 });
 router.get('/getName', async (req, res) => { 
	
	console.log('getName:',req.body);
    return res.json({ findUser: (await User.findOne({NTUID:req.body.NTUID})).name})
    
 });

 router.get('/getPersonalInfo', async (req, res) => { 
	const defaultInfo = {
		name:req.query.name,
		imgPath:`${BASE_URL}public/uploads/0.jpg`,
		introduction:'說點關於自己的事吧',
		expertise:'擅長什麼呢',
		demands:  '有什麼大家能幫你的嗎'
	}
	console.log('getPersonalInfo req:',req)
	console.log('getPersonalInfo req.query:',req.query)
	console.log('getPersonalInfo req.query.name:',req.query.name)
	await Personal.findOne({name:req.query.name}).then(info => {
		console.log('info:',info)
		console.log('info:',info)
		if(info){
			return res.json({personalInfo:info})
		}else{
			return res.json({personalInfo:defaultInfo})
		}
		
	})
	return res.json({personalInfo:defaultInfo})
 });
 router.put('/modifyPersonalInfo', async (req, res) => { 
	
	await Personal.findOne({name:req.body.name}).then(async (info) => {
		console.log('info:',info)
		await Personal.findOneAndUpdate({name:info.name},
		{ 
			name: req.body.name, 
			imgPath: req.body.imgPath,
			introduction: req.body.introduction,
			expertise: req.body.expertise,
			demands: req.body.demands
		},(err,docs)=>{
			if (err){ console.log(err) }
		}).then(info=>{
			return res.json({personalInfo:info})
		})
		// return res.json({tagPosts:posts.filter(post=>post.NTUID!==req.body.NTUID&&((post.tag&tag)===tag))})
	})
 });


 
 router.put('/:userId', (req, res) => { 
	res.send(
		`PUT HTTP method on users/${req.params.userId} resource`,
	);
});



module.exports = router