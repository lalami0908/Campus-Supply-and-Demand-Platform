const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const MessageSchema = new Schema({
	//將messages歸到每一張需求單底下的留言板
    demandId: { 
		type: String,
		required: [true, 'demandId field is required.']
	},
	name: {
		type: String,
		required: [true, 'user name field is required.']
	},
    NTUID: {
		type: String,
		required: [true, 'NTUID field is required.']
	},
	// 留言不該包含 name ->使用者會更新
    // name: String,
    content: {
		type: String,
		required: [true, 'content field is required.']
    },
    msgDate: {
		type: Date,
		required: [true, 'msgDate field is required.']
	},


})

// Creating a table within database with the defined schema
const Message = mongoose.model('Message', MessageSchema)

// Exporting table for querying and mutating
module.exports = Message
