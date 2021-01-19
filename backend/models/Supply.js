const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SupplySchema = new Schema({
    _id: String,
    NTUID: String, // 接單者的NTUID 
    demandId: String, // demand_id

    postDate: Date,
    isAccept: Boolean,
    currentState: String,  // enum: 這個是?
});

const Supply = mongoose.model('Supply', SupplySchema);
module.exports = Supply