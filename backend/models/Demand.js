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


    // Method: post a demand after login  
    // user access control

    //Client端送來的資訊
    title: String,
    // subTitle: String,
    content: String, 
    deadline: Date,
    pay: String, //price: Number, (不限制以金錢回報)
    imgPath: String,
    category: String,
    needSupplyCnt: Number,

    //Server端接收到新需求單時需補上的資訊
    _id: String,
    host: String, // user_id
    postDate: Date,
    updateDate: Date, // Method: edit post
    tag: Number,//熱門、最新、緊急、高報酬...(對應search頁面的tags) 可用linux存rwx權限的二進位方式來存// auto-complete dropDown list (?) // choose block
    views: Number, // Method: add when someone vist
    state: String, //'onDemand'|'onMatching'|'onComplete'
    isOpen: Boolean, // Method: demander close post
    
    //what?
    confirmTransaction: [String], //supply_id // Method: set score for the confirmed supply

});

const Demand = mongoose.model('Demand', DemandSchema);
module.exports = Demand