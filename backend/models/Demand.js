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
    NTUID: String, // user_id
    content: String, 
    deadline: Date,
    price: Number, //(以金錢方式以外回報的可以打在content)
    imgPath: [String],
    category: String,//食衣住行育樂其它?
    needSupplyCnt: Number,//default: 1

    //Server端接收到新需求單時需補上的資訊
    // _id: String,
    name: String, // user name (顯示給其它人看的)
    postDate: Date,
    updateDate: Date, // Method: edit post
    /*
      // hot: '熱門', 8
      // current: '近期刊登', 4
      // highPayment: '高報酬', 2
      // urgent: '緊急任務', 1
    */
    tag: Number,//熱門、最新、緊急、高報酬...(對應search頁面的tags) 可用linux存rwx權限的二進位方式來存// auto-complete dropDown list (?) // choose block
    // views: Number, // Method: add when someone vist
    state: String, //'onDemand'|'onMatching'|'onComplete'
    isOpen: Boolean, // Method: demander close post(在想有沒有需要，可以關掉之後就直接從DB砍了)
    supplyCnt: Number,
    supplyList: [String],
    // messageList: [Message],


    // confirmTransaction: [String], //supply_id // Method: set score for the confirmed supply

});

const Demand = mongoose.model('Demand', DemandSchema);
module.exports = Demand