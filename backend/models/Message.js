const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({

	id: {
		type: String,
		required: [true, 'MessageId field is required.']
	},
	chatRoomId: {
		type: String,
		required: [true, 'chatRoomId field is required.']
	},
	userId: {
		type: String,
		required: [true, 'userId field is required.']
	},
	// the same
	name: {
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
