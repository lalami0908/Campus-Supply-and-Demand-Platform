const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SupplySchema = new Schema({
    _id: String,
    host: String, // NTUID

    postDate: Date,
    demandId: String, // demand_id

    isAccept: Boolean,
    currentState: String,  // enum: 
});

const Supply = mongoose.model('Supply', SupplySchema);
module.exports = Supply