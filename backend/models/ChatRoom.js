const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ChatRoomSchema = new Schema({
    _id: String,
    ownerList: [String], // two, or record in users??

});

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);
module.exports = ChatRoom