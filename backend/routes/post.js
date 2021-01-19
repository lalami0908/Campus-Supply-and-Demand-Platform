const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

// const Demand = require('../models/Demand')
// const Supply = require('../models/Supply')
const Demand = mongoose.model('Demand');
const Supply = mongoose.model('Supply');

const path = require('path')
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


//重點API:新增需求，根據DemandSchema 收到所需client資訊，補上server所需資訊， 存入DB
router.post('/addNewPost', async (req, res) => { 
    console.log(req);
    res.send('post:addNewPost');

    console.log('Got body:', req.body); 
    if(!req.body.title || !req.body.NTUID || !req.body.content || !req.body.deadline || !req.body.price || !req.body.category) {
      return res.json({ registerResult:{ success: false, msg: '刊登失敗：請將需求單資料填完'}});
    }

    //以下開始補上server資料
    let newPost = {...req.body}
    newPost.postDate = new Date()
    newPost.tag = 0
    
    //這段用來產生tag (熱門、最新、緊急、高報酬 分別對應8 4 2 1)
    if(newPost.NTUID.substring(1, 3)==='09'){//TODO:熱門的判定方法，或留給server黑箱收廣告費好了
      //09優先 友善新生XD
      newPost.tag | 8
    }
    //"最新"這個tag是留到query時才上，把當天的補上tag再回傳回前端
    // if(){
    //   newPost.tag | 4
    // }
    if(parseInt(Math.abs(newPost.postDate - newPost.deadline) / 1000 / 60 / 60 / 24)<=3){//3天內
      newPost.tag | 2
    }
    if(newPost.price > 918){//TODO:之後server端寫個高效能的排序一下，別每次add new就重新排序，例如可以維護一個只跟價格有關的資料結構
      newPost.tag | 1
    }
    // updateDate: 讓update API來補
    // views: 初期不需要，TODO
    newPost.state = 'onDemand'
    // newPost.postId = 產生一個亂數 還是mongo有內建? 


    let mongoRes = await Demand.create(newPost) 
    console.log('mongoRes:',mongoRes)
    return res.json({ addNewResult:{ success: true, msg: '刊登成功!', postDate: newPost.postDate, postId:''}});
    // let newPost = new Demand({ name: payload.name, body: payload.body });
    //       newMessage.save(function (err) {
    //         if (err) return handleError(err);
    //         // saved!
    //       });
});

router.get('/getAllPosts', (req, res) => { 
    res.send('getAllPosts');
    //TODO 抓DB資料
  console.log(req.body);
  Demand.find().then((posts) => {
    //{ 'NTUID': req.body.NTUID } 濾掉自己的post
    return res.json({allPosts:posts.filter(post=>post.NTUID!==req.body.NTUID)})
  })
  
});
router.get('/getTagPosts', (req, res) => { 
  res.send('getTagPosts');
  //TODO 抓DB資料
  console.log(req.body.text);

  return res.json({tagPosts:[]})
});
router.get('/getUserPosts', async (req, res) => { 
  res.send('getUserPosts');
  //TODO 抓DB資料
  console.log(req.body);
  let findOwnPost = await Demand.find({NTUID:req.body.NTUID})
  return res.json({userPosts:findOwnPost})
});

router.get('/getUserSupplies', (req, res) => { 
  res.send('getUserSupplies');
  //TODO 抓DB資料
  console.log(req.body.text);

  return res.json({userSupplies:[]})
});

router.put('/updateYourPost', (req, res) => { 
	res.send('test3');
	console.log(req.body.text);
});

router.get('/supplyPost', (req, res) => { 
  res.send('supplyPost');
  //TODO 修改DB資料，將需求單的state做更動
  console.log(req.body.text);

  return res.json({feedback:{ success: true, msg:'應徵成功'}})
});
// router.post('/uploadImage', (req, res) => { 
//     console.log(req);
//     console.log(req.body);
//     res.setHeader('Access-Control-Allow-Headers', 'x-requested-with');
//     res.send('uploadImage');
// });


router.post('/deleteImage', (req, res) => { 
    console.log(req);
    console.log(req.body);

    res.send('deleteImage');
});


router.post('/uploadImage', upload.single('file'), (req, res) => {
    const { file: { filename, path } } = req
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