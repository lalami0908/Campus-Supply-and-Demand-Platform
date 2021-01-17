const mongoose = require('mongoose')
const Schema = mongoose.Schema


// Method: 
// add a new demand

// list others' demands: 
//          filter: all (before deadline & !isclosed)/ tag / date / visist/

// list your own demands:
//          filter: all / tag / date / visist/
// view the demand detail (inProcess)
//             view: the supplies
//             confirm: check the supply
// history (isOpen): score

// edit the demand
// delete the demand

// close the demand: confirmTransaction / score or later
// 
//

const DemandSchema = new Schema({
    _id: String,
    host: String, // user_id

    // Method: post a demand after login  
    // user access control
    title: String,
    subTitle: String,
    content: String, 
    deadline: Date,
    price: Number,

    category: String,
    tag: String, // auto-complete dropDown list (?) // choose block

    postDate: Date,
    updateDate: Date, // Method: edit post

    views: Number, // Method: add when someone vist

    isOpen: Boolean, // Method: demander close post
    needSupplyCnt: Number,
    supplyList: [String],


    confirmTransaction: [String], //supply_id // Method: set score for the confirmed supply

});

const Demand = mongoose.model('Demand', DemandSchema);
module.exports = Demand