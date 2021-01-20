const mongoose = require('mongoose')
const Schema = mongoose.Schema
const DemandSchema = new Schema({

    // Client端送來的資訊
    title: String,
    NTUID: String, 
    content: String, 
    deadline: Date,
    price: Number, // (以金錢方式以外回報的可以打在content)
    imgPath: [String],
    category: String,//食衣住行育樂其它
    needSupplyCnt: Number,//default: 1

    // Server端接收到新需求單時需補上的資訊

    name: String, // user name (顯示給其它人看的)
    postDate: Date,
    updateDate: Date, 

    /*
      // hot: '熱門', 8
      // current: '近期刊登', 4
      // highPayment: '高報酬', 2
      // urgent: '緊急任務', 1
    */
    tag: Number,// 熱門、最新、緊急、高報酬...(對應search頁面的tags) 二進位方式來存
    state: String, //'onDemand'|'onMatching'|'onComplete'
    supplyCnt: Number,
    supplyList: [String],
    
    isOpen: Boolean, 
     // views: Number, // Method: add when someone vist


});

const Demand = mongoose.model('Demand', DemandSchema);
module.exports = Demand