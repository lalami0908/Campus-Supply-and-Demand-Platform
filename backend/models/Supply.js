const mongoose = require('mongoose')
const Schema = mongoose.Schema


const SupplySchema = new Schema({
    NTUID: String, // 接單者的NTUID
    applyDate: Date, //接單時間
    demandId: String, // demand_id
    isAccept: Boolean,// TODO 之後可以做需求方的同意
    // currentState: String,  
});

const Supply = mongoose.model('Supply', SupplySchema);
module.exports = Supply