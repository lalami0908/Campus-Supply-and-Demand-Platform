const express = require("express");
const router = express.Router();
const auth = require('../config/auth');
import {Message, Demand, User,SYSTEM_MSG} from '../models'

router.post('/addMessage', auth.required, (req, res) => { 
	const { newMessageForm } = req.body;
	console.log('addMessage:');
	console.log(newMessageForm);

	let newMessage = new Message({ 
		demandId: newMessageForm.demand_id,
		NTUID: newMessageForm.NTUID,
		name: newMessageForm.name,
		content: newMessageForm.content,
		msgDate: new Date(),
	});



	/***** relational database schema ***/
	newMessage.save().then((addedNewMessage) => { 
		console.log("新增留言成功,新留言: ");
		console.log(addedNewMessage);
		return res.json({ addNewMessageResult:{ success: true, msg: '新增留言成功', newMessage: addedNewMessage}});
	});


});


router.post('/getMessage', auth.required, (req, res) => { 
	const { demand_id } = req.body;
	console.log("getMessage by demand_id: ", demand_id);
	// TODO: 有找：有訊息/沒訊息/找的時候出錯？
	Message.find({demandId: req.body.demand_id}).then(async (messages) => {
		console.log("取回留言: ")
		console.log('getMessage:',messages)
		if(!messages.some(msg=>!msg.name)){
			console.log("都有名字")
			return res.json({ getMessageResult: { success: true, messages: messages} });
		}
		//這邊滿頭問號 但是會work
		let promiseMessages = messages.map(async message=>{
			let usr = await User.findOne({NTUID:message.NTUID})
			console.log('find user:',usr)
			return 	{name:usr.name,
				demandId:message.demandId,
				NTUID:message.NTUID,
				content:message.content,
				msgDate:message.msgDate
			}
		})
		let results = await Promise.all(promiseMessages)
		console.log('results:',results)
		// console.log('promiseMessages:',promiseMessages)
		return res.json({ getMessageResult: { success: true, messages: results} });

	})

});






module.exports = router