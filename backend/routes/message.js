const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Message = mongoose.model('Message');
const Demand = mongoose.model('Demand');


router.post('/addMessage', (req, res) => { 
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


router.post('/getMessage', (req, res) => { 
	const { demand_id } = req.body;
	console.log("getMessage by demand_id: ", demand_id);
	// TODO: 有找：有訊息/沒訊息/找的時候出錯？
	Message.find({demandId: req.body.demand_id}).then((messages) => {
		console.log("取回留言: ")
		console.log('getMessage:',messages)
		return res.json({ getMessageResult: { success: true, messages: messages} });
	})

});






module.exports = router