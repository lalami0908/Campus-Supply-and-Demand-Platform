const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PersonalSchema = new Schema({
    NTUID: String,//固定
    name: String,
    imgPath: String,
    introduction: String,
    expertise: String,
    demands: String,
});
// Creating a table within database with the defined schema
const Personal = mongoose.model('Personal', PersonalSchema)

// Exporting table for querying and mutating
module.exports = Personal
