// import express from 'express';
const express = require("express");
const router = express.Router();
// import bodyParser from 'body-parser';
// import cors from 'cors' 
import { User,Personal,BASE_URL } from '../models'

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
	// console.log('getPersonalInfo req:',req)
	console.log('getPersonalInfo req.query:',req.query)
	console.log('getPersonalInfo req.query.name:',req.query.name)
	await Personal.findOne({name:req.query.name}).then(info => {
		console.log('info:',info)
		if(info){
			return res.json({personalInfo:info})
		}else{
			return res.json({personalInfo:defaultInfo})
		}	
	})
	// return res.json({personalInfo:defaultInfo})
 });
 router.post('/modifyPersonalInfo', async (req, res) => { 
	console.log('modifyPersonalInfo req.body:',req.body)
	var imgPath = "";
	if(req.body.fileList.length > 0){
		imgPath= req.body.fileList[0].url
	  } else {
		imgPath = BASE_URL+'public/uploads/0.jpg';
	}
	await Personal.findOne({name:req.body.name}).then(async (info) => {
		console.log('找到使用者 info:',info);
		if(info){
			
			await Personal.findOneAndUpdate({name:info.name},
				{ 
					name: req.body.name, 
					imgPath: imgPath,
					introduction: req.body.intro,
					expertise: req.body.expert,
					demands: req.body.demand
				},(err,docs)=>{
					if (err){ console.log(err) }
				}).then(info=>{
					console.log("更新成功", info);
					return res.json({ personalInfoResult: {success:true, personalInfo:info} })
				})
		} else {
			console.log('找不到使用者 info:')

			let newInfo = { 
				name: req.body.name,
				imgPath: imgPath,
				introduction: req.body.intro,
				expertise: req.body.expert,
				demands: req.body.demand
			}
			console.log('newInfo:',newInfo)
			Personal.create(newInfo).then((info) => { 
				console.log("新增info成功 ");
				console.log(info);
				return res.json({ personalInfoResult:{ success: true, info:info}});
			});
		
			/***** relational database schema ***/
		


		}

		// return res.json({tagPosts:posts.filter(post=>post.NTUID!==req.body.NTUID&&((post.tag&tag)===tag))})
	})
 });


 
 router.put('/:userId', (req, res) => { 
	res.send(
		`PUT HTTP method on users/${req.params.userId} resource`,
	);
});



module.exports = router