const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({

	id: {//直接對應Demand ID?這樣是不是不用chatRoom
		type: String,
		required: [true, 'MessageId field is required.']
	},
	chatRoomId: {
		type: String,
		required: [true, 'chatRoomId field is required.']
	},
	userId: {//留言者(顯示於server)
		type: String,
		required: [true, 'userId field is required.']
	},
	// the same
	name: {//留言者暱稱(顯示在留言板的)
		type: String,
		required: [true, 'Name field is required.']
	},
	body: {
		type: String,
		required: [true, 'Body field is required.']
	},
	time: {
		type: Date,
		required: [true, 'Time field is required.']
	}
})

// Creating a table within database with the defined schema
const Message = mongoose.model('message', MessageSchema)

// Exporting table for querying and mutating
module.exports = Message
