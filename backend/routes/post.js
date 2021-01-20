const express = require("express");
const router = express.Router();
const path = require('path')
import {Demand,Supply,BASE_URL } from '../models'
const auth = require('../config/auth');
const mongoose = require('mongoose');
const Message = mongoose.model('Message');


const multer = require('multer')
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      // 上傳文件儲存目錄
      cb(null, 'public/uploads')
    },
    filename(req, file, cb) {
      //使用時間為文件命名
      const extname = path.extname(file.originalname)
      cb(null, Date.now() + extname)
    }
  })
})

// 新增需求
router.post('/addNewPost', auth.required, (req, res) => { 
    console.log("addNewPost");
    const { newPostForm } = req.body;
   
    // 前端有擋，後端也要檢查空值
    if(!newPostForm.title || !newPostForm.NTUID || !newPostForm.content || !newPostForm.deadline  || !newPostForm.category){
      var invailmsg = "新增需求失敗，需求單未填寫完整";
      console.log(invailmsg);
      return res.json({ addNewPostResult:{ success: false, msg: invailmsg}});
    } 
    //
    // 補上表單空值
    if(!newPostForm.needSupplyCnt){
      newPostForm.needSupplyCnt = 1;
    }

    // 處理 tag
    newPostForm.tag = 0 //init!
    //這段用來產生tag (熱門、最新、緊急、高報酬 分別對應8 4 2 1)
    if(newPostForm.NTUID.substring(1, 3)==='09'){//TODO:熱門的判定方法，或留給server黑箱收廣告費好了
      //09優先 友善新生XD
      newPostForm.tag = newPostForm.tag | 8
    }
    //"最新"這個tag應該是留到query時才上，把當天的補上tag再回傳回前端
    // if(){
    //   newPost.tag | 4
    // }
    const postNow = new Date()
    const d = newPostForm.deadline.split('-')
    const postDeadline= new Date(d[0],d[1]-1,d[2],23,59,59); 
    console.log(`newPostForm.postDate:${postNow},newPostForm.deadline:${postDeadline}`)
    console.log('check data distance:',Math.abs(postNow - postDeadline))
    if(parseInt(Math.abs(postNow- postDeadline) / 1000 / 60 / 60 / 24)<=3){//3天內
      newPostForm.tag = newPostForm.tag | 2
    }
    if(newPostForm.price > 918){//TODO:之後server端寫個高效能的排序一下，別每次add new就重新排序，例如可以維護一個只跟價格有關的資料結構
      newPostForm.tag = newPostForm.tag | 1
    }
    // newPostForm['tag'] = 4;

    var imgPath = [];
    console.log('newPostForm.fileList:',newPostForm.fileList)
    if(newPostForm.fileList.length > 0){
      console.log('testing item.url')
      newPostForm.fileList.forEach(function(item, i) {
        imgPath.push(item.url);
        console.log('item.url:',item.url)
      });
    }else{
      imgPath.push(BASE_URL+'public/uploads/0.jpg');
    }

    let newPost = new Demand({ 
      title: newPostForm.title, 
      content: newPostForm.content,
      deadline: newPostForm.deadline, 
      price: newPostForm.price,
      imgPath: imgPath,
      category: newPostForm.category,
      needSupplyCnt: newPostForm.needSupplyCnt,
      NTUID:  newPostForm.NTUID,

      name: newPostForm.name,
        
      postDate: postNow,
      tag: newPostForm.tag,
      state: 'onDemand',
      isOpen: true,
      supplyCnt: 0,
      supplyList:[],
    });

    //  TODO:新增進ＤＢ失敗
    newPost.save().then((getNewPost) => { 
      console.log("新增需求成功,新需求: ");
      console.log(getNewPost);
      return res.json({ addNewPostResult:{ success: true, msg: '新增需求成功', newPost: getNewPost}});
    });
  
    
});
// 查詢需求：主頁取得所有post資料
router.post('/getAllPosts', auth.required, async (req, res) => { 
  console.log('getAllPosts');
  // console.log('req.body:',req.body);
  await Demand.find({state:'onDemand'}).then((posts) => {
    //濾掉自己的post
    let canSupplyPosts = posts.filter(post=>post.NTUID!==req.body.NTUID)
    console.log('取得所有不屬於自己，且狀態開啟的需求單',canSupplyPosts)
    return res.json({ allPosts: canSupplyPosts})
  })
  
});
const tagValue = {
  hot: 8,
  current: 4,
  urgent: 2,
  highPayment: 1 
}
router.post('/getTagPosts', auth.required,  async (req, res) => { 
  console.log('req.body:',req.body);
  let tag = tagValue[req.body.tag]
  await Demand.find({state:'onDemand'}).then((posts) => {
    console.log('posts:',posts)
    //濾掉自己的post
    return res.json({tagPosts:posts.filter(post=>post.NTUID!==req.body.NTUID&&((post.tag&tag)===tag))})
  })
});

// 我的需求頁面
router.post('/getUserPosts', auth.required, async (req, res) => { 
  console.log("getUserPosts");
  console.log('req.body:',req.body);
  console.log(req.body.NTUID);
  // 關了應該也還要看得到吧？TODO:顯示需求單狀態
  Demand.find({NTUID:req.body.NTUID}).then((posts) => {
    console.log(posts);
    return res.json({userPosts:posts});
  })
});

// 取得使用者供給
router.post('/getUserSupplies', auth.required, (req, res) => { 
  //TODO 抓DB資料
  console.log(req.body);
  Supply.find({NTUID:req.body.NTUID}).then((sups) => {
    console.log('sups:',sups);
    return res.json({userSupplies:sups});
  })
});

router.post('/getIdPost', auth.required, (req, res) => { 
  console.log('getIdPost:',req.body);
  Demand.findById(req.body.postID).then((uniquePost) => {
    console.log(uniquePost);
    return res.json({uniquePost:uniquePost});
  })
});

router.post('/getIdPosts', auth.required, (req, res) => { 
  console.log('getIdPosts ids:',req.body.postIDs);
  Demand.find().then((posts) => res.json({idPosts:posts.filter(post=>req.body.postIDs.includes(post._id.toString()))}))
});

// TODO:編輯需求
router.put('/updateYourPost', auth.required, (req, res) => { 

	console.log(req.body.text);
});

// 刪除需求
router.post('/deleteYourPost', auth.required, (req, res) => { 
  console.log('getIdPost:', req.body.postID);

});


// 接單功能
router.put('/supplyPost', auth.required, async(req, res) => { 
  console.log('嘗試接單，獲得參數：');
  console.log('supplyPostID:',req.body.postID);
  console.log('NTUID:',req.body.NTUID);
  await Demand.findById(req.body.postID).then(async (post) =>{
    console.log('找到需求單：', post);
    let stateChange = post.state;
    console.log('需求單當前狀態為：', stateChange);
    // 檢查是否已申請接單
    if(post.supplyList.includes(req.body.NTUID)){
      console.log("接單失敗，已申請過接單"); 
      return res.json({ feedback:{ success: false, msg: '接單失敗，已申請過接單'}});
    }
    if(post.supplyList.length+1 >=post.needSupplyCnt){
      stateChange = 'onMatching';
      console.log("需求單更新為 onMatching"); 
    } 
    await Demand.findByIdAndUpdate(post._id, 
      { supplyList: [...post.supplyList, req.body.NTUID], 
        supplyCnt: post.supplyCnt+1,
        state: stateChange
      },(err,docs)=>{
        if (err){ console.log(err) }
      }
    ).then(async (demand)=>{
      console.log("需求單更新成功", demand); 
      await Supply.create({ NTUID: req.body.NTUID ,applyDate: new Date(), demandId:req.body.postID} )
      .then((supply)=>{
        let newSystemMessage = new Message({
          demandId: demand._id,
          NTUID: "====！系統留言！",
          name: "====！系統留言！",
          content: `${req.body.NTUID } 已申請接受該需求 ====`,
          msgDate: new Date(),
         });
         newSystemMessage.save().then((addedNewMessage) => { 
          console.log("系統留言: ");
          console.log(addedNewMessage);
          return res.json({ feedback:{ success: true, msg: '接單成功'}});
        });
      })
   

    });
  })
});



router.post('/deleteImage', auth.required, (req, res) => { 
    console.log(req);
    console.log(req.body);

    res.send('deleteImage');
});


router.post('/uploadImage', auth.required, upload.single('file'), (req, res) => {
    const { file: { filename, path } } = req
    console.log("uploadImageRoute");
    console.log(req.file);
    res.setHeader('Access-Control-Allow-Headers', 'x-requested-with');
    res.json({
      ok: true,
      message: '圖片上傳成功',
      data: {
        name: filename,
        url: path
      }
    })
})
  
  

module.exports = router;